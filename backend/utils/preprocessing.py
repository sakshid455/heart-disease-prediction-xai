"""
Preprocessing utilities for patient input alignment and scaling.
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List


def format_patient_features(patient_dict: Dict[str, Any], feature_names: List[str]) -> pd.DataFrame:
    """
    Constructs a DataFrame aligning user-supplied features to the exact feature order of the trained model.
    """
    df = pd.DataFrame([patient_dict])
    # Ensure all required features are present
    missing = [col for col in feature_names if col not in df.columns]
    if missing:
        raise ValueError(f"Missing required features: {missing}")
    return df[feature_names]
