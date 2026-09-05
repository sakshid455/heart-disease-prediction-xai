import pandas as pd

test_data = pd.read_csv("data/processed/real_test.csv")

print("First Test Patient:")
print(test_data.iloc[0])

print("\nActual Target:")
print(test_data.iloc[0]["num"])