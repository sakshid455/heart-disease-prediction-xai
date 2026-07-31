import streamlit as st
import pandas as pd
import numpy as np
import shap

from sklearn.ensemble import RandomForestClassifier


# ============================================================
# PAGE CONFIGURATION
# ============================================================

st.set_page_config(
    page_title="Heart Disease Prediction",
    page_icon="❤️",
    layout="wide"
)


# ============================================================
# CUSTOM CSS
# ============================================================

st.markdown(
    """
    <style>

    .main-title {
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
    }

    .subtitle {
        text-align: center;
        font-size: 18px;
        color: #666;
        margin-bottom: 30px;
    }

    .result-box {
        padding: 25px;
        border-radius: 15px;
        text-align: center;
        margin-top: 20px;
    }

    .info-box {
        padding: 20px;
        border-radius: 10px;
        background-color: #f5f5f5;
        margin-top: 20px;
    }

    </style>
    """,
    unsafe_allow_html=True
)


# ============================================================
# TITLE
# ============================================================

st.markdown(
    '<div class="main-title">❤️ Heart Disease Prediction System</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="subtitle">'
    'Explainable AI-Based Heart Disease Risk Prediction'
    '</div>',
    unsafe_allow_html=True
)


st.info(
    "This application is a research prototype and should not be used "
    "as a substitute for professional medical diagnosis."
)


# ============================================================
# LOAD DATA
# ============================================================

@st.cache_data
def load_data():

    train_data = pd.read_csv(
        "data/processed/real_train.csv"
    )

    return train_data


# ============================================================
# TRAIN MODEL
# ============================================================

@st.cache_resource
def train_model():

    data = load_data()

    X = data.drop(
        columns=["num"]
    )

    y = data["num"]

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    model.fit(
        X,
        y
    )

    return model


model = train_model()


# ============================================================
# SHAP EXPLAINER
# ============================================================

@st.cache_resource
def create_explainer():

    return shap.TreeExplainer(
        model
    )


explainer = create_explainer()


# ============================================================
# SIDEBAR
# ============================================================

st.sidebar.header(
    "Patient Information"
)

st.sidebar.write(
    "Enter the patient's medical information below."
)


# ============================================================
# PATIENT INPUTS
# ============================================================

age = st.sidebar.number_input(
    "Age",
    min_value=1,
    max_value=120,
    value=50
)


sex = st.sidebar.selectbox(
    "Sex",
    options=[0, 1],
    format_func=lambda x:
        "Female (0)" if x == 0 else "Male (1)"
)


cp = st.sidebar.selectbox(
    "Chest Pain Type (CP)",
    options=[1, 2, 3, 4],
    format_func=lambda x: f"Type {x}"
)


trestbps = st.sidebar.number_input(
    "Resting Blood Pressure",
    min_value=50,
    max_value=250,
    value=120
)


chol = st.sidebar.number_input(
    "Cholesterol",
    min_value=50,
    max_value=600,
    value=200
)


fbs = st.sidebar.selectbox(
    "Fasting Blood Sugar > 120 mg/dl",
    options=[0, 1],
    format_func=lambda x:
        "No (0)" if x == 0 else "Yes (1)"
)


restecg = st.sidebar.selectbox(
    "Resting ECG",
    options=[0, 1, 2]
)


thalach = st.sidebar.number_input(
    "Maximum Heart Rate Achieved",
    min_value=50,
    max_value=250,
    value=150
)


exang = st.sidebar.selectbox(
    "Exercise Induced Angina",
    options=[0, 1],
    format_func=lambda x:
        "No (0)" if x == 0 else "Yes (1)"
)


oldpeak = st.sidebar.number_input(
    "ST Depression (Oldpeak)",
    min_value=0.0,
    max_value=10.0,
    value=1.0,
    step=0.1
)


slope = st.sidebar.selectbox(
    "Slope",
    options=[1, 2, 3]
)


ca = st.sidebar.selectbox(
    "Number of Major Vessels (CA)",
    options=[0, 1, 2, 3]
)


thal = st.sidebar.selectbox(
    "Thalassemia (Thal)",
    options=[3, 6, 7],
    format_func=lambda x:
        {
            3: "Normal (3)",
            6: "Fixed Defect (6)",
            7: "Reversible Defect (7)"
        }[x]
)


# ============================================================
# CREATE INPUT DATAFRAME
# ============================================================

input_data = pd.DataFrame(
    [[
        age,
        sex,
        cp,
        trestbps,
        chol,
        fbs,
        restecg,
        thalach,
        exang,
        oldpeak,
        slope,
        ca,
        thal
    ]],
    columns=[
        "age",
        "sex",
        "cp",
        "trestbps",
        "chol",
        "fbs",
        "restecg",
        "thalach",
        "exang",
        "oldpeak",
        "slope",
        "ca",
        "thal"
    ]
)


# ============================================================
# MAIN CONTENT
# ============================================================

st.subheader(
    "Patient Details"
)

st.dataframe(
    input_data,
    use_container_width=True
)


# ============================================================
# PREDICTION BUTTON
# ============================================================

if st.button(
    "🔍 Predict Heart Disease Risk",
    use_container_width=True
):

    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    prediction = model.predict(
        input_data
    )[0]

    probabilities = model.predict_proba(
        input_data
    )[0]

    probability = probabilities[1]


    # --------------------------------------------------------
    # Result
    # --------------------------------------------------------

    st.subheader(
        "Prediction Result"
    )


    if prediction == 1:

        st.error(
            f"⚠️ Heart Disease Risk Detected\n\n"
            f"Estimated Probability: {probability * 100:.2f}%"
        )

    else:

        st.success(
            f"✅ No Heart Disease Risk Detected\n\n"
            f"Estimated Probability: {probability * 100:.2f}%"
        )


    # --------------------------------------------------------
    # Probability Metrics
    # --------------------------------------------------------

    col1, col2 = st.columns(2)


    with col1:

        st.metric(
            "No Disease Probability",
            f"{probabilities[0] * 100:.2f}%"
        )


    with col2:

        st.metric(
            "Disease Probability",
            f"{probabilities[1] * 100:.2f}%"
        )


    # ========================================================
    # SHAP EXPLANATION
    # ========================================================

    st.subheader(
        "🤖 Explainable AI Analysis"
    )

    st.write(
        "The following features contributed most to this prediction."
    )


    # Calculate SHAP values

    shap_values = explainer.shap_values(
        input_data
    )


    # Handle SHAP output versions

    if isinstance(
        shap_values,
        list
    ):

        patient_shap = shap_values[1][0]

    elif len(shap_values.shape) == 3:

        patient_shap = shap_values[0, :, 1]

    else:

        patient_shap = shap_values[0]


    # Create explanation dataframe

    explanation = pd.DataFrame({

        "Feature": input_data.columns,

        "Value": input_data.iloc[0].values,

        "SHAP Value": patient_shap

    })


    explanation[
        "Impact"
    ] = np.where(

        explanation["SHAP Value"] > 0,

        "Increases Disease Risk",

        "Decreases Disease Risk"

    )


    explanation[
        "Absolute Impact"
    ] = explanation[
        "SHAP Value"
    ].abs()


    explanation = explanation.sort_values(

        by="Absolute Impact",

        ascending=False

    )


    # --------------------------------------------------------
    # Display SHAP Results
    # --------------------------------------------------------

    st.dataframe(

        explanation[
            [
                "Feature",
                "Value",
                "SHAP Value",
                "Impact"
            ]
        ],

        use_container_width=True

    )


    # ========================================================
    # TOP CONTRIBUTING FEATURES
    # ========================================================

    st.subheader(
        "Top Contributing Features"
    )


    top_features = explanation.head(
        5
    )


    for _, row in top_features.iterrows():

        if row["SHAP Value"] > 0:

            st.warning(

                f"🔴 **{row['Feature']}** "
                f"({row['Value']}) increased the predicted risk."

            )

        else:

            st.success(

                f"🟢 **{row['Feature']}** "
                f"({row['Value']}) decreased the predicted risk."

            )


# ============================================================
# FOOTER
# ============================================================

st.markdown(
    "---"
)

st.caption(
    "Research Prototype | CTGAN Synthetic Data + "
    "Random Forest + SHAP Explainable AI"
)

st.caption(
    "This tool is for educational and research purposes only "
    "and is not a medical diagnostic system."
)