# Removed pandas and scikit-learn dependencies
# Updated the preprocess_dataset function to use built-in Python libraries
import csv
from random import shuffle

def preprocess_dataset(file_path, output_dir):
    """Preprocess a CSV dataset for training and validation."""
    # Load the dataset
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        data = list(reader)

    # Example preprocessing: Drop rows with missing values
    data = [row for row in data if all(row.values())]

    # Shuffle and split into training and validation sets
    shuffle(data)
    split_index = int(0.8 * len(data))
    train_data, val_data = data[:split_index], data[split_index:]

    # Save the processed datasets
    with open(f"{output_dir}/train.csv", 'w', newline='') as train_file:
        writer = csv.DictWriter(train_file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(train_data)

    with open(f"{output_dir}/val.csv", 'w', newline='') as val_file:
        writer = csv.DictWriter(val_file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(val_data)

    print(f"Preprocessed data saved to {output_dir}")

if __name__ == "__main__":
    # Example usage
    preprocess_dataset("example_dataset.csv", "processed_data")