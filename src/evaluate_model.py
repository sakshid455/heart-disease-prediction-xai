"""
Model evaluation module
Evaluate model performance and generate metrics
"""

from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score,
    mean_squared_error, mean_absolute_error, r2_score
)
import numpy as np


def evaluate_classification(y_true, y_pred, y_pred_proba=None):
    """
    Evaluate classification model
    
    Args:
        y_true (array): True labels
        y_pred (array): Predicted labels
        y_pred_proba (array): Predicted probabilities (optional)
        
    Returns:
        dict: Dictionary with evaluation metrics
    """
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred, average='weighted', zero_division=0),
        'recall': recall_score(y_true, y_pred, average='weighted', zero_division=0),
        'f1': f1_score(y_true, y_pred, average='weighted', zero_division=0),
        'confusion_matrix': confusion_matrix(y_true, y_pred),
        'classification_report': classification_report(y_true, y_pred)
    }
    
    if y_pred_proba is not None:
        try:
            metrics['roc_auc'] = roc_auc_score(y_true, y_pred_proba, multi_class='ovr', average='weighted')
        except:
            metrics['roc_auc'] = None
    
    return metrics


def evaluate_regression(y_true, y_pred):
    """
    Evaluate regression model
    
    Args:
        y_true (array): True values
        y_pred (array): Predicted values
        
    Returns:
        dict: Dictionary with evaluation metrics
    """
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)
    
    metrics = {
        'mse': mse,
        'rmse': rmse,
        'mae': mae,
        'r2_score': r2
    }
    
    return metrics


def print_metrics(metrics, task='classification'):
    """
    Print evaluation metrics
    
    Args:
        metrics (dict): Metrics dictionary
        task (str): 'classification' or 'regression'
    """
    print("\n" + "="*50)
    print(f"{task.upper()} METRICS")
    print("="*50)
    
    for key, value in metrics.items():
        if key not in ['confusion_matrix']:
            if isinstance(value, (int, float)):
                print(f"{key}: {value:.4f}")
            else:
                print(f"{key}:\n{value}")
    
    print("="*50 + "\n")


def cross_validate_model(model, X, y, cv=5, task='classification'):
    """
    Perform cross-validation
    
    Args:
        model: Machine learning model
        X (array): Features
        y (array): Target
        cv (int): Number of folds
        task (str): 'classification' or 'regression'
        
    Returns:
        dict: Cross-validation results
    """
    from sklearn.model_selection import cross_validate, cross_val_score
    
    if task == 'classification':
        scoring = ['accuracy', 'precision_weighted', 'recall_weighted', 'f1_weighted']
    else:
        scoring = ['r2', 'neg_mean_squared_error', 'neg_mean_absolute_error']
    
    cv_results = cross_validate(model, X, y, cv=cv, scoring=scoring)
    
    return cv_results
