import pandas as pd
from sklearn.model_selection import train_test_split

def preprocess_dataset(file_path, output_dir):
    """Preprocess a CSV dataset for training and validation."""
    # Load the dataset
    data = pd.read_csv(file_path)

    # Example preprocessing: Drop missing values
    data = data.dropna()

    # Split into training and validation sets
    train_data, val_data = train_test_split(data, test_size=0.2, random_state=42)

    # Save the processed datasets
    train_data.to_csv(f"{output_dir}/train.csv", index=False)
    val_data.to_csv(f"{output_dir}/val.csv", index=False)

    print(f"Preprocessed data saved to {output_dir}")

if __name__ == "__main__":
    # Example usage
    preprocess_dataset("example_dataset.csv", "processed_data")