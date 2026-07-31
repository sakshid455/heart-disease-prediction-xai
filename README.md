# Synthetic Data Predictive Analysis

A comprehensive project for analyzing synthetic data and building predictive models using machine learning techniques.

## Project Structure

```
Synthetic-Data-Predictive-Analysis/
├── data/
│   ├── raw/              # Raw input data files
│   └── processed/        # Processed data files
├── models/               # Saved trained models
├── notebooks/            # Jupyter notebooks for analysis
│   ├── 01_data_analysis.ipynb
│   ├── 02_synthetic_data_generation.ipynb
│   └── 03_predictive_model.ipynb
├── src/                  # Source code modules
│   ├── data_preprocessing.py
│   ├── synthetic_data.py
│   ├── train_model.py
│   └── evaluate_model.py
├── results/              # Results and outputs
├── app.py                # Flask web application
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation
```

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Running Notebooks
Navigate to the `notebooks/` directory and open the Jupyter notebooks:
```bash
jupyter notebook
```

### Running the Flask App
```bash
python app.py
```

### Using the Modules
Import modules from `src/`:
```python
from src.data_preprocessing import preprocess_data
from src.synthetic_data import generate_synthetic_data
from src.train_model import train_model
from src.evaluate_model import evaluate_model
```

## Notebooks

1. **01_data_analysis.ipynb** - Exploratory data analysis
2. **02_synthetic_data_generation.ipynb** - Generate synthetic datasets
3. **03_predictive_model.ipynb** - Build and train predictive models

## License

This project is open source and available under the MIT License.
