"""
CardioAI Research Framework - Centralized Structured Logging
"""

import os
import sys
import logging
from datetime import datetime

LOGS_DIR = "logs"
os.makedirs(LOGS_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOGS_DIR, "research_framework.log")

def get_research_logger(name: str = "cardioai.research") -> logging.Logger:
    """Returns a configured logger with console and file handlers."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        # Console handler
        ch = logging.StreamHandler(sys.stdout)
        ch.setFormatter(formatter)
        logger.addHandler(ch)

        # File handler
        try:
            fh = logging.FileHandler(LOG_FILE, encoding="utf-8")
            fh.setFormatter(formatter)
            logger.addHandler(fh)
        except Exception:
            pass

    return logger

logger = get_research_logger()
