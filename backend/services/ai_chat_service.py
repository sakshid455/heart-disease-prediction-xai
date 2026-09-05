"""
CardioAI Assistant - Core AI Chat Service
Implements conversational intelligence, project knowledge grounding,
clinical safety guards, context-aware routing, and external LLM orchestration.
"""

import os
import re
import json
import logging
from typing import List, Dict, Any, Optional
import httpx
from dotenv import load_dotenv

# Load variables from .env file if present
load_dotenv()

logger = logging.getLogger("cardioai.chat")

# ---------------------------------------------------------------------------
# Project Ground Truth Knowledge & Clinical Safety System Prompt
# ---------------------------------------------------------------------------
CARDIOAI_SYSTEM_PROMPT = """You are "CardioAI Assistant", an empathetic, highly specialized AI-powered heart health guide and research companion for the CardioAI research project.

### IDENTITY & GOAL
You assist users in understanding cardiovascular health, symptoms, prevention, risk factors, machine learning predictions, SHAP explanations, CTGAN synthetic data generation, and the research methodology behind CardioAI.

### STRICT CLINICAL SAFETY RULES (CRITICAL)
1. NEVER diagnose the user. You are NOT a medical doctor.
2. If the user asks "Do I have heart disease?" or similar diagnostic questions, respond with:
   "I can't diagnose whether you have heart disease. CardioAI provides a machine-learning risk estimate based on the clinical information entered into the assessment system. For a personalized medical evaluation, consult a qualified healthcare professional."
   (Recommend using the Risk Assessment tool).
3. If the user asks "Am I going to have a heart attack?" or asks to predict imminent emergencies, clearly explain that ML models evaluate statistical risk factors and cannot predict future acute crises.
4. If a user describes severe emergency symptoms (acute crushing chest pain radiating to the jaw/arm, sudden shortness of breath, unexplained fainting, cold sweats), urgently instruct them to call 911 or their local emergency services immediately.
5. Emphasize that all outputs are for educational and research purposes and not a substitute for professional medical care.

### CARDIOAI RESEARCH PROJECT KNOWLEDGE (GROUND TRUTH)
- PROJECT TITLE: "Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction"
- DATASET: UCI Heart Disease Dataset (Cleveland clinic cohort) consisting of 303 patient records and 14 clinical attributes:
  * age: Age in years
  * sex: Biological sex (1 = male, 0 = female)
  * cp: Chest pain type (0: typical angina, 1: atypical angina, 2: non-anginal pain, 3: asymptomatic)
  * trestbps: Resting blood pressure (mm Hg on admission)
  * chol: Serum cholesterol (mg/dl)
  * fbs: Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)
  * restecg: Resting ECG results (0: normal, 1: ST-T wave abnormality, 2: left ventricular hypertrophy)
  * thalach: Maximum heart rate achieved during exercise
  * exang: Exercise-induced angina (1 = yes, 0 = no)
  * oldpeak: ST depression induced by exercise relative to rest
  * slope: Slope of peak exercise ST segment (0: upsloping, 1: flat, 2: downsloping)
  * ca: Number of major vessels (0-3) colored by fluoroscopy
  * thal: Thallium stress scintigraphy (1: normal, 2: fixed defect, 3: reversible defect)
  * num (target): Diagnosis of heart disease (0: <50% diameter narrowing, 1: >50% diameter narrowing)
- PREPROCESSING: Data cleaning handled missing values present in 'ca' (4 missing) and 'thal' (2 missing) via domain-consistent imputation prior to model training. Continuous features standardized using Z-score scaling.
- SYNTHETIC DATA & CTGAN: Conditional Tabular GAN (CTGAN) was trained to generate realistic synthetic healthcare records. CTGAN uses Variational Gaussian Mixture (VGM) mode-specific continuous normalization and conditional generators with a PacGAN discriminator to model complex non-linear clinical distributions without leaking patient identity.
- ADAPTIVE AUGMENTATION: The research systematically evaluates synthetic augmentation ratios: 0% (baseline real data), 25%, 50%, 75%, 100%, 150%, and 200%.
- MACHINE LEARNING MODELS: Logistic Regression, Random Forest, and XGBoost (Extreme Gradient Boosting).
- BEST CURRENT EXPERIMENTAL CONFIGURATION:
  * Model: XGBoost
  * Augmentation Ratio: 200% synthetic augmentation
  * Training Samples: 726 samples
  * Experimental Accuracy: 90.16%
  * Precision: 84.38%
  * Recall: 96.43%
  * F1-Score: 90.00%
  * ROC-AUC: 93.72%
  * IMPORTANT: These are experimental research benchmark results on the test partition (N=61). They are NOT clinical trial validations. Never say "90.16% clinically accurate" — say "In the current experiment, XGBoost with 200% augmentation achieved 90.16% accuracy."
- EXPLAINABLE AI (XAI): SHAP (SHapley Additive exPlanations) utilizes game theory (TreeSHAP) to compute exact feature attribution scores, showing why a specific prediction was made. Top drivers across the cohort include 'ca', 'thal', 'cp', 'thalach', and 'oldpeak'.

### RESPONSE FORMAT
Provide answers that are concise, clear, medically responsible, and research-accurate.
Format using clean markdown with bullet points where appropriate.
If a website page is relevant to the answer, reference it naturally.
"""

# Route descriptions for page-context awareness
PAGE_DESCRIPTIONS = {
    "/": "The user is on the CardioAI Home / Overview page.",
    "/prediction": "The user is currently on the Heart Disease Risk Assessment page, where clinical variables can be entered to generate an ML prediction.",
    "/prediction-result": "The user is viewing their personalized Risk Assessment Results, including risk probability, category, and SHAP feature contributions.",
    "/explainable-ai": "The user is exploring SHAP Explainable AI and feature attribution analysis.",
    "/explainability": "The user is exploring SHAP Explainable AI and feature attribution analysis.",
    "/ctgan": "The user is exploring CTGAN synthetic data generation, mode-specific normalization, and generative healthcare privacy.",
    "/synthetic-data": "The user is exploring CTGAN synthetic data generation.",
    "/performance": "The user is viewing model performance benchmarks (Accuracy, Recall, ROC-AUC) across augmentation levels (0% to 200%).",
    "/models": "The user is comparing machine learning models (Logistic Regression, Random Forest, XGBoost).",
    "/research": "The user is reading the research methodology, dataset breakdown, preprocessing, and experimental design.",
    "/methodology": "The user is reading the research methodology and pipeline architecture.",
    "/heart-health": "The user is reading the clinical guide on cardiovascular disease types, symptoms, risk factors, and prevention.",
    "/resources": "The user is browsing the educational resources and knowledge library.",
    "/about": "The user is reading about the CardioAI research project and objectives.",
    "/contact": "The user is on the contact and collaboration page.",
}


class AIChatService:
    """Manages conversations, calls external AI providers if configured, or uses the knowledge engine fallback."""

    def __init__(self):
        # Read API key from environment variable
        self.api_key = (
            os.getenv("AI_API_KEY")
            or os.getenv("GROQ_API_KEY")
            or os.getenv("OPENAI_API_KEY")
            or os.getenv("GEMINI_API_KEY")
            or ""
        ).strip()
        
        # Determine provider and base URL based on key prefix or explicit settings
        if self.api_key.startswith("gsk_"):
            self.base_url = os.getenv("AI_BASE_URL", "https://api.groq.com/openai/v1").rstrip("/")
            # Default to gpt-oss-120b or configured model on Groq
            default_model = "openai/gpt-oss-120b"
            configured_model = os.getenv("AI_MODEL", default_model).strip()
            # If user had gpt-4o-mini configured, upgrade to Groq model
            self.model = default_model if configured_model in ["gpt-4o-mini", "llama-3.3-70b-versatile"] else configured_model
            self.provider = "groq"
            logger.info(f"CardioAI Assistant initialized with Groq Cloud provider ({self.model})")
        elif "gemini" in os.getenv("AI_MODEL", "").lower() or (self.api_key.startswith("AIza") and not os.getenv("AI_BASE_URL")):
            self.base_url = os.getenv("AI_BASE_URL", "https://generativelanguage.googleapis.com/v1beta").rstrip("/")
            self.model = os.getenv("AI_MODEL", "gemini-1.5-flash").strip()
            self.provider = "gemini"
            logger.info(f"CardioAI Assistant initialized with Gemini provider ({self.model})")
        else:
            self.base_url = os.getenv("AI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
            self.model = os.getenv("AI_MODEL", "gpt-4o-mini").strip()
            self.provider = "openai_compatible"
            if self.api_key:
                logger.info(f"CardioAI Assistant initialized with OpenAI-compatible provider ({self.model})")
            else:
                logger.info("CardioAI Assistant running in offline domain knowledge engine mode")

    def _determine_action(self, message: str, response_text: str, page_context: str) -> Optional[Dict[str, str]]:
        """Determines if a helpful navigation action button should accompany the response."""
        msg_lower = message.lower()
        resp_lower = response_text.lower()

        # Check diagnostic or risk assessment intent
        if any(term in msg_lower for term in ["do i have", "my risk", "diagnose", "predict", "assessment", "check heart", "am i having", "test my", "symptoms"]):
            if page_context != "/prediction":
                return {"label": "Start Risk Assessment", "route": "/prediction"}

        # Explainable AI / SHAP
        if any(term in msg_lower for term in ["shap", "explain", "feature importance", "xai", "attribut"]):
            if page_context not in ["/explainable-ai", "/explainability"]:
                return {"label": "Explore Explainable AI", "route": "/explainable-ai"}

        # CTGAN / Synthetic Data
        if any(term in msg_lower for term in ["ctgan", "synthetic", "generat", "augmentation", "synthetic data"]):
            if page_context not in ["/ctgan", "/synthetic-data"]:
                return {"label": "Explore CTGAN", "route": "/ctgan"}

        # Model Performance / Accuracy / ROC-AUC
        if any(term in msg_lower for term in ["accuracy", "performance", "metric", "roc", "auc", "f1", "precision", "recall", "xgboost"]):
            if page_context not in ["/performance", "/models"]:
                return {"label": "View Model Performance", "route": "/performance"}

        # Research / Methodology / Dataset
        if any(term in msg_lower for term in ["uci", "dataset", "methodology", "research", "records", "attributes", "paper"]):
            if page_context not in ["/research", "/methodology", "/dataset"]:
                return {"label": "Read Research", "route": "/research"}

        # General Heart Health
        if any(term in msg_lower for term in ["cholesterol", "blood pressure", "prevention", "diet", "exercise", "smoking", "lifestyle"]):
            if page_context != "/heart-health":
                return {"label": "Learn About Heart Disease", "route": "/heart-health"}

        return None

    def _generate_suggestions(self, message: str, page_context: str) -> List[str]:
        """Generates contextual follow-up questions."""
        msg_lower = message.lower()

        if "shap" in msg_lower or "explain" in msg_lower:
            return [
                "Which features are most influential?",
                "How does SHAP compare to feature importance?",
                "How accurate is the model?",
            ]
        elif "ctgan" in msg_lower or "synthetic" in msg_lower:
            return [
                "Why did you use CTGAN?",
                "How does synthetic data help?",
                "What was the best augmentation ratio?",
            ]
        elif "accuracy" in msg_lower or "performance" in msg_lower or "model" in msg_lower:
            return [
                "What was your best model?",
                "What is ROC-AUC?",
                "How does CardioAI predict risk?",
            ]
        elif "symptom" in msg_lower or "risk" in msg_lower or "cholesterol" in msg_lower:
            return [
                "What are the major risk factors?",
                "How does CardioAI predict risk?",
                "What lifestyle changes prevent heart disease?",
            ]
        elif "dataset" in msg_lower or "uci" in msg_lower or "research" in msg_lower:
            return [
                "What features are used?",
                "How was missing data handled?",
                "Why XGBoost?",
            ]
        else:
            return [
                "How does CardioAI predict risk?",
                "What is SHAP?",
                "What was your best model?",
            ]

    def _knowledge_engine_fallback(self, message: str, history: List[Dict[str, str]], page_context: str) -> str:
        """High-precision, medically responsible domain knowledge engine for CardioAI."""
        msg = message.lower().strip()

        # Emergency detection
        if any(word in msg for word in ["chest pain", "crushing", "heart attack right now", "call 911", "severe pain in arm", "cannot breathe", "fainting"]):
            return (
                "⚠️ **URGENT MEDICAL NOTICE**\n\n"
                "If you or someone nearby is experiencing acute chest pain, pressure, pain radiating to the arm, neck, or jaw, severe shortness of breath, or sudden dizziness, **please contact 911 or your local emergency medical services immediately**.\n\n"
                "CardioAI is an educational research tool and cannot diagnose medical emergencies."
            )

        # Diagnostic inquiry
        if any(phrase in msg for phrase in ["do i have heart disease", "am i having a heart attack", "diagnose me", "tell me if i am sick", "do i have it"]):
            return (
                "I can't diagnose whether you have heart disease. CardioAI provides a machine-learning risk estimate based on the clinical information entered into the assessment system. "
                "For a personalized medical evaluation, consult a qualified healthcare professional.\n\n"
                "If you would like to estimate your statistical risk based on standard clinical indicators (such as blood pressure, cholesterol, resting ECG, and heart rate), you can use our interactive **Risk Assessment** page."
            )

        # Symptoms
        if "symptom" in msg:
            return (
                "### Common Symptoms of Heart Disease\n\n"
                "Symptoms of cardiovascular disease can vary depending on the underlying condition, but common warning signs include:\n\n"
                "- **Chest Discomfort (Angina):** Pressure, fullness, squeezing, or pain in the center of the chest that may spread to the shoulder, arm, neck, or jaw.\n"
                "- **Shortness of Breath (Dyspnea):** Difficulty breathing during exertion or even while resting.\n"
                "- **Fatigue and Weakness:** Unexplained exhaustion during ordinary daily activities.\n"
                "- **Palpitations:** Sensation of a racing, pounding, or fluttering heartbeat.\n"
                "- **Swelling (Edema):** Accumulation of fluid in the legs, ankles, or feet.\n"
                "- **Dizziness or Lightheadedness:** Feeling faint, especially upon standing quickly.\n\n"
                "*Note: Women and diabetics may experience atypical symptoms such as severe nausea, back pain, or indigestion rather than classic chest pressure.*"
            )

        # Risk Factors
        if "risk factor" in msg or "risk factors" in msg:
            return (
                "### Major Cardiovascular Risk Factors\n\n"
                "Cardiovascular risk factors are generally categorized into modifiable and non-modifiable:\n\n"
                "**Modifiable Risk Factors:**\n"
                "- **Hypertension:** High resting blood pressure (>130/80 mm Hg) damages arterial walls.\n"
                "- **Dyslipidemia:** Elevated LDL ('bad') cholesterol and low HDL ('good') cholesterol.\n"
                "- **Smoking:** Damages endothelial lining and accelerates atherosclerosis.\n"
                "- **Hyperglycemia / Diabetes:** Accelerates arterial stiffness and plaque formation.\n"
                "- **Physical Inactivity & Obesity:** Contributes to metabolic syndrome.\n\n"
                "**Non-Modifiable Risk Factors:**\n"
                "- **Age:** Risk increases significantly for men ≥45 and women ≥55.\n"
                "- **Biological Sex:** Men generally face earlier risk; post-menopausal women experience equivalent risk.\n"
                "- **Family History:** Genetic predisposition to premature coronary artery disease."
            )

        # Cholesterol inquiry & Follow-up support ("it" referring to cholesterol)
        if "cholesterol" in msg or ("how does it affect" in msg and any("cholesterol" in h.get("content", "").lower() for h in history[-2:])):
            return (
                "### Cholesterol and Cardiovascular Health\n\n"
                "**Cholesterol** is a waxy, fat-like substance synthesized by the liver and absorbed from dietary sources. It is essential for producing cell membranes, vitamin D, and hormones.\n\n"
                "**How it impacts heart disease:**\n"
                "- **LDL (Low-Density Lipoprotein):** Often called 'bad cholesterol'. High circulating levels lead to plaque deposition inside arterial walls (atherosclerosis), narrowing the lumen and restricting blood flow to cardiac tissue.\n"
                "- **HDL (High-Density Lipoprotein):** Known as 'good cholesterol'. HDL scavenges excess arterial cholesterol and transports it back to the liver for excretion.\n"
                "- In the CardioAI model, serum cholesterol (`chol`) is one of the 14 key clinical attributes analyzed."
            )

        # SHAP / Explainability
        if "shap" in msg or "explainable ai" in msg or "xai" in msg or "how does shap explain" in msg:
            return (
                "### What is SHAP in CardioAI?\n\n"
                "**SHAP (SHapley Additive exPlanations)** is an axiomatic game-theoretic method used to explain machine learning predictions.\n\n"
                "- **Fair Attribution:** Derived from cooperative game theory (Lloyd Shapley, Nobel Laureate), it calculates each feature's marginal contribution across all possible feature coalitions.\n"
                "- **Local Explanations:** For any individual patient, SHAP computes positive (risk-increasing) and negative (risk-reducing) SHAP values.\n"
                "- **Global Insights:** Across the CardioAI research cohort, SHAP identified **major vessels colored (`ca`)**, **thallium scintigraphy defect (`thal`)**, **chest pain type (`cp`)**, and **max heart rate (`thalach`)** as the primary diagnostic drivers.\n"
                "- **Additive Efficiency:** The sum of all SHAP values equals the difference between the patient's predicted log-odds and the base expected value: $\\sum \\phi_i = f(x) - E[f(x)]$."
            )

        # CTGAN / Synthetic data
        if "ctgan" in msg or "synthetic data" in msg or "synthetic" in msg:
            return (
                "### What is CTGAN and Why Synthetic Data?\n\n"
                "**CTGAN (Conditional Tabular Generative Adversarial Network)** is a deep generative model tailored specifically for tabular healthcare datasets.\n\n"
                "**Why Synthetic Healthcare Data?**\n"
                "1. **Sample Scarcity:** Real clinical cohorts (like the 303-patient UCI Cleveland dataset) are small, limiting deep ML model training.\n"
                "2. **Class Imbalance:** Generative augmentation allows balanced representation of severe or rare pathological subgroups.\n"
                "3. **Privacy Preservation:** High-fidelity synthetic records mimic statistical relationships without exposing individual patient identities.\n\n"
                "**How CTGAN Works:**\n"
                "- It uses **mode-specific continuous normalization** via Variational Gaussian Mixtures (VGM) to handle multimodal distributions (e.g. cholesterol spikes).\n"
                "- It trains a conditional generator and PacGAN discriminator to maintain conditional joint distributions."
            )

        # Adaptive Augmentation
        if "adaptive augmentation" in msg or "augmentation" in msg:
            return (
                "### What is Adaptive Augmentation?\n\n"
                "In this research, **Adaptive Augmentation** refers to systematically evaluating model performance across incremental ratios of synthetic-to-real training data:\n\n"
                "- Ratios tested: **0% (baseline real), 25%, 50%, 75%, 100%, 150%, and 200%**.\n"
                "- As synthetic data is introduced, the decision boundary generalizes better, mitigating overfitting.\n"
                "- The peak experimental performance was achieved at **200% augmentation** (726 training samples), producing optimal sensitivity and generalization."
            )

        # Best Model / Accuracy / ROC-AUC / Performance
        if any(term in msg for term in ["accuracy", "accurate", "best model", "performance", "roc-auc", "f1", "precision", "recall"]):
            return (
                "### CardioAI Experimental Model Performance\n\n"
                "In our research experiments evaluating Logistic Regression, Random Forest, and XGBoost across synthetic augmentation levels:\n\n"
                "- **Optimal Model:** XGBoost\n"
                "- **Optimal Augmentation Level:** 200% synthetic data\n"
                "- **Training Cohort Size:** 726 samples\n"
                "- **Experimental Accuracy:** **90.16%**\n"
                "- **Precision:** **84.38%**\n"
                "- **Recall (Sensitivity):** **96.43%**\n"
                "- **F1-Score:** **90.00%**\n"
                "- **ROC-AUC:** **93.72%**\n\n"
                "> ⚠️ **Important Clinical Note:** These represent experimental benchmark results on the test partition ($N=61$) of the UCI Cleveland dataset. They demonstrate the benefits of synthetic data augmentation in machine learning research, but do **not** constitute clinical validation."
            )

        # Dataset / UCI / Features
        if any(term in msg for term in ["dataset", "uci", "features", "attributes", "records", "how many records"]):
            return (
                "### Dataset and Clinical Attributes\n\n"
                "CardioAI utilizes the canonical **UCI Heart Disease Dataset (Cleveland Clinic)**:\n\n"
                "- **Sample Size:** 303 patient records\n"
                "- **Clinical Features:** 14 attributes\n"
                "- **Key Features Include:**\n"
                "  1. `age`: Patient age in years\n"
                "  2. `sex`: Biological sex (1 = male, 0 = female)\n"
                "  3. `cp`: Chest pain type (typical, atypical, non-anginal, asymptomatic)\n"
                "  4. `trestbps`: Resting systolic blood pressure\n"
                "  5. `chol`: Serum cholesterol in mg/dl\n"
                "  6. `fbs`: Fasting blood sugar > 120 mg/dl\n"
                "  7. `restecg`: Resting electrocardiographic measurements\n"
                "  8. `thalach`: Maximum heart rate achieved\n"
                "  9. `exang`: Exercise-induced angina\n"
                "  10. `oldpeak`: ST depression induced by exercise\n"
                "  11. `slope`: Peak exercise ST segment slope\n"
                "  12. `ca`: Number of fluoroscopy-colored major vessels (0-3)\n"
                "  13. `thal`: Thallium scintigraphy defect type\n"
                "  14. `num`: Target coronary heart disease diagnosis"
            )

        # Project overview / What is this project
        if any(term in msg for term in ["what is this project", "about this project", "cardioai", "what do you do", "who are you"]):
            return (
                "### About the CardioAI Research Project\n\n"
                "**CardioAI** is an advanced research and decision-support platform exploring **'Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction'**.\n\n"
                "The project solves three core challenges in modern medical AI:\n"
                "1. **Data Scarcity:** Generating high-fidelity, privacy-preserving synthetic healthcare data via CTGAN.\n"
                "2. **Model Generalization:** Demonstrating that 200% adaptive synthetic augmentation boosts XGBoost accuracy from baseline to 90.16% (96.43% recall).\n"
                "3. **Clinical Interpretability:** Using SHAP (SHapley Additive exPlanations) to provide transparent, feature-by-feature justifications for every prediction."
            )

        # Blood pressure / Hypertension
        if "blood pressure" in msg or "hypertension" in msg:
            return (
                "### Blood Pressure and Heart Health\n\n"
                "Blood pressure measures the lateral force exerted by circulating blood against arterial walls:\n\n"
                "- **Normal:** Systolic < 120 mm Hg and Diastolic < 80 mm Hg.\n"
                "- **Elevated:** Systolic 120–129 and Diastolic < 80.\n"
                "- **Hypertension Stage 1:** Systolic 130–139 or Diastolic 80–89.\n"
                "- **Hypertension Stage 2:** Systolic ≥ 140 or Diastolic ≥ 90.\n\n"
                "Chronic hypertension forces the myocardium to work harder against elevated peripheral resistance, eventually causing left ventricular hypertrophy and arterial micro-tears."
            )

        # Lifestyle & Prevention
        if any(term in msg for term in ["prevention", "prevent", "lifestyle", "diet", "exercise"]):
            return (
                "### Preventing Cardiovascular Disease\n\n"
                "Evidence-based strategies to mitigate cardiovascular risk include:\n\n"
                "1. **Heart-Healthy Nutrition:** Adopt a Mediterranean or DASH diet rich in vegetables, legumes, whole grains, and lean proteins, while minimizing ultra-processed foods and trans fats.\n"
                "2. **Regular Aerobic Exercise:** At least 150 minutes of moderate-intensity or 75 minutes of vigorous exercise per week.\n"
                "3. **Tobacco Cessation:** Smoking accelerates plaque rupture and doubles cardiac mortality; quitting begins reversing risk within weeks.\n"
                "4. **Blood Pressure & Lipid Monitoring:** Routine primary care screening to keep BP < 130/80 and LDL within target ranges.\n"
                "5. **Stress & Sleep:** Aim for 7–9 hours of quality sleep and practice stress-reduction techniques."
            )

        # Context-aware fallback response
        page_info = PAGE_DESCRIPTIONS.get(page_context, "You are browsing the CardioAI platform.")
        return (
            f"Thank you for your question regarding heart health and the CardioAI project.\n\n"
            f"Currently, {page_info.lower()}\n\n"
            "I can assist you with:\n"
            "- **Heart Disease & Prevention:** Symptoms, risk factors, blood pressure, cholesterol.\n"
            "- **Machine Learning Models:** XGBoost, Random Forest, Logistic Regression.\n"
            "- **CTGAN & Synthetic Data:** Generative privacy and adaptive augmentation.\n"
            "- **Explainable AI (SHAP):** Feature attribution and patient risk breakdown.\n\n"
            "Feel free to ask a specific question or select one of the suggested topics below!"
        )

    async def get_response(
        self,
        message: str,
        history: Optional[List[Dict[str, str]]] = None,
        page_context: str = "/",
    ) -> Dict[str, Any]:
        """Main entrypoint for generating chat responses."""
        if history is None:
            history = []

        # Sanitize and validate input
        cleaned_message = message.strip()
        if not cleaned_message:
            return {
                "response": "Please enter a question or select one of the suggested topics.",
                "suggestions": [
                    "What are the symptoms of heart disease?",
                    "How does CardioAI predict risk?",
                    "What is SHAP?",
                ],
                "action": None,
            }

        # Truncate overly long messages (max 1500 chars)
        if len(cleaned_message) > 1500:
            cleaned_message = cleaned_message[:1500]

        # Contextual prompt enrichment
        current_page_desc = PAGE_DESCRIPTIONS.get(page_context, f"User is on route: {page_context}")
        augmented_system_prompt = (
            f"{CARDIOAI_SYSTEM_PROMPT}\n\n"
            f"### CURRENT USER PAGE CONTEXT:\n{current_page_desc}\n"
            "Tailor your response to be maximally relevant to the user's current view while staying within your role."
        )

        response_text = ""

        # 1. Check if external AI provider is configured
        if self.api_key:
            try:
                response_text = await self._call_external_ai(
                    system_prompt=augmented_system_prompt,
                    message=cleaned_message,
                    history=history,
                )
            except Exception as e:
                logger.warning(f"External AI provider call failed ({str(e)}), falling back to domain knowledge engine.")
                response_text = ""

        # 2. If no API key or provider failed, use the built-in domain knowledge engine
        if not response_text:
            response_text = self._knowledge_engine_fallback(
                message=cleaned_message,
                history=history,
                page_context=page_context,
            )

        # 3. Determine navigation action
        action = self._determine_action(
            message=cleaned_message,
            response_text=response_text,
            page_context=page_context,
        )

        # 4. Generate contextual suggestions
        suggestions = self._generate_suggestions(
            message=cleaned_message,
            page_context=page_context,
        )

        return {
            "response": response_text,
            "suggestions": suggestions,
            "action": action,
        }

    async def _call_external_ai(
        self,
        system_prompt: str,
        message: str,
        history: List[Dict[str, str]],
    ) -> str:
        """Invokes external AI provider (OpenAI-compatible or Gemini) with safe timeouts and error handling."""
        # Format history (keep last 6 turns to avoid context overflow)
        formatted_messages = [{"role": "system", "content": system_prompt}]
        for item in history[-6:]:
            role = item.get("role", "user")
            content = item.get("content", "")
            if role in ["user", "assistant"] and content:
                formatted_messages.append({"role": role, "content": content})

        formatted_messages.append({"role": "user", "content": message})

        # OpenAI-compatible API
        async with httpx.AsyncClient(timeout=15.0) as client:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }
            payload = {
                "model": self.model,
                "messages": formatted_messages,
                "temperature": 0.4,
                "max_tokens": 700,
            }
            url = f"{self.base_url}/chat/completions"

            res = await client.post(url, headers=headers, json=payload)
            if res.status_code == 200:
                data = res.json()
                content = data["choices"][0]["message"]["content"].strip()
                return content
            else:
                logger.warning(f"AI API responded with code {res.status_code}: {res.text[:200]}")
                return ""


# Singleton instance
ai_chat_service = AIChatService()
