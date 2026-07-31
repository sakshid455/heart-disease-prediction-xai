"""
Synthetic data generation module
Generate synthetic datasets for testing and analysis
"""

import pandas as pd
import numpy as np
from sklearn.datasets import make_classification, make_regression


def generate_classification_data(n_samples=1000, n_features=10, n_classes=2, random_state=42):
    """
    Generate synthetic classification dataset
    
    Args:
        n_samples (int): Number of samples
        n_features (int): Number of features
        n_classes (int): Number of classes
        random_state (int): Random seed
        
    Returns:
        tuple: (X, y) features and target
    """
    X, y = make_classification(
        n_samples=n_samples,
        n_features=n_features,
        n_classes=n_classes,
        n_informative=max(2, n_features // 2),
        n_redundant=max(0, n_features // 3),
        random_state=random_state
    )
    return X, y


def generate_regression_data(n_samples=1000, n_features=10, random_state=42):
    """
    Generate synthetic regression dataset
    
    Args:
        n_samples (int): Number of samples
        n_features (int): Number of features
        random_state (int): Random seed
        
    Returns:
        tuple: (X, y) features and target
    """
    X, y = make_regression(
        n_samples=n_samples,
        n_features=n_features,
        n_informative=max(2, n_features // 2),
        random_state=random_state
    )
    return X, y


def synthetic_data_to_dataframe(X, y, feature_names=None, target_name='target'):
    """
    Convert synthetic data to DataFrame
    
    Args:
        X (array): Features
        y (array): Target
        feature_names (list): Names for features
        target_name (str): Name for target column
        
    Returns:
        pd.DataFrame: Combined dataframe
    """
    if feature_names is None:
        feature_names = [f'feature_{i}' for i in range(X.shape[1])]
    
    df = pd.DataFrame(X, columns=feature_names)
    df[target_name] = y
    return df


def generate_synthetic_dataset(n_samples=1000, n_features=10, task='classification', 
                             n_classes=2, random_state=42):
    """
    Generate complete synthetic dataset
    
    Args:
        n_samples (int): Number of samples
        n_features (int): Number of features
        task (str): 'classification' or 'regression'
        n_classes (int): Number of classes (for classification)
        random_state (int): Random seed
        
    Returns:
        pd.DataFrame: Synthetic dataset
    """
    if task == 'classification':
        X, y = generate_classification_data(
            n_samples=n_samples,
            n_features=n_features,
            n_classes=n_classes,
            random_state=random_state
        )
    elif task == 'regression':
        X, y = generate_regression_data(
            n_samples=n_samples,
            n_features=n_features,
            random_state=random_state
        )
    else:
        raise ValueError(f"Unknown task: {task}")
    
    df = synthetic_data_to_dataframe(X, y)
    return df


def add_noise(df, noise_level=0.1, random_state=42):
    """
    Add noise to synthetic dataset
    
    Args:
        df (pd.DataFrame): Input dataframe
        noise_level (float): Proportion of noise to add
        random_state (int): Random seed
        
    Returns:
        pd.DataFrame: Dataframe with added noise
    """
    np.random.seed(random_state)
    df_noisy = df.copy()
    
    numeric_cols = df_noisy.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        if col != 'target':
            noise = np.random.normal(0, noise_level * df_noisy[col].std(), len(df_noisy))
            df_noisy[col] += noise
    
    return df_noisy
