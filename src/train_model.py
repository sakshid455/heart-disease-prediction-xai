"""
Model training module
Train machine learning models on datasets
"""

import joblib
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression


def train_classification_model(X, y, model_type='random_forest', test_size=0.2, random_state=42):
    """
    Train classification model
    
    Args:
        X (array): Features
        y (array): Target
        model_type (str): Type of model ('random_forest' or 'logistic_regression')
        test_size (float): Proportion of test data
        random_state (int): Random seed
        
    Returns:
        dict: Dictionary with model, X_train, X_test, y_train, y_test
    """
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )
    
    if model_type == 'random_forest':
        model = RandomForestClassifier(n_estimators=100, random_state=random_state)
    elif model_type == 'logistic_regression':
        model = LogisticRegression(random_state=random_state, max_iter=1000)
    else:
        raise ValueError(f"Unknown model type: {model_type}")
    
    model.fit(X_train, y_train)
    
    return {
        'model': model,
        'X_train': X_train,
        'X_test': X_test,
        'y_train': y_train,
        'y_test': y_test,
        'model_type': model_type
    }


def train_regression_model(X, y, model_type='random_forest', test_size=0.2, random_state=42):
    """
    Train regression model
    
    Args:
        X (array): Features
        y (array): Target
        model_type (str): Type of model ('random_forest' or 'linear_regression')
        test_size (float): Proportion of test data
        random_state (int): Random seed
        
    Returns:
        dict: Dictionary with model, X_train, X_test, y_train, y_test
    """
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )
    
    if model_type == 'random_forest':
        model = RandomForestRegressor(n_estimators=100, random_state=random_state)
    elif model_type == 'linear_regression':
        model = LinearRegression()
    else:
        raise ValueError(f"Unknown model type: {model_type}")
    
    model.fit(X_train, y_train)
    
    return {
        'model': model,
        'X_train': X_train,
        'X_test': X_test,
        'y_train': y_train,
        'y_test': y_test,
        'model_type': model_type
    }


def save_model(model, filepath):
    """
    Save trained model to file
    
    Args:
        model: Trained model
        filepath (str): Path to save model
    """
    joblib.dump(model, filepath)
    print(f"Model saved to {filepath}")


def load_model(filepath):
    """
    Load trained model from file
    
    Args:
        filepath (str): Path to model file
        
    Returns:
        Loaded model
    """
    model = joblib.load(filepath)
    print(f"Model loaded from {filepath}")
    return model
