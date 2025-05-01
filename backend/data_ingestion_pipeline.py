import requests
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from influxdb import InfluxDBClient
from pymongo import MongoClient
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# PostgreSQL configuration
POSTGRESQL_URI = "postgresql://username:password@localhost:5432/verda_clime"

# InfluxDB configuration
INFLUXDB_HOST = "localhost"
INFLUXDB_PORT = 8086
INFLUXDB_DATABASE = "verda_clime"

# MongoDB configuration
MONGODB_URI = "mongodb://localhost:27017/"
MONGODB_DATABASE = "verda_clime"

# Function to fetch live weather data
def fetch_weather_data(api_key, location):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching weather data: {e}")
        return None

# Function to fetch crop forecast data
def fetch_crop_forecast_data():
    url = "https://example.gov.in/crop_forecast"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching crop forecast data: {e}")
        return None

# Function to fetch historical datasets
def fetch_historical_data(file_path):
    try:
        data = pd.read_csv(file_path)
        return data
    except Exception as e:
        logging.error(f"Error fetching historical data: {e}")
        return None

# Function to transform and clean data
def transform_data(data):
    try:
        df = pd.DataFrame(data)
        df = df.replace({np.nan: None})  # Handle missing values
        return df
    except Exception as e:
        logging.error(f"Error transforming data: {e}")
        return None

# Function to load data into PostgreSQL
def load_to_postgresql(data, table_name):
    try:
        engine = create_engine(POSTGRESQL_URI)
        data.to_sql(table_name, engine, if_exists='replace', index=False)
        logging.info(f"Data loaded into PostgreSQL table: {table_name}")
    except Exception as e:
        logging.error(f"Error loading data into PostgreSQL: {e}")

# Function to load time-series data into InfluxDB
def load_to_influxdb(data, measurement):
    try:
        client = InfluxDBClient(host=INFLUXDB_HOST, port=INFLUXDB_PORT)
        client.switch_database(INFLUXDB_DATABASE)
        json_body = [
            {
                "measurement": measurement,
                "fields": row.to_dict()
            } for _, row in data.iterrows()
        ]
        client.write_points(json_body)
        logging.info(f"Data loaded into InfluxDB measurement: {measurement}")
    except Exception as e:
        logging.error(f"Error loading data into InfluxDB: {e}")

# Function to load unstructured data into MongoDB
def load_to_mongodb(data, collection_name):
    try:
        client = MongoClient(MONGODB_URI)
        db = client[MONGODB_DATABASE]
        collection = db[collection_name]
        collection.insert_many(data.to_dict('records'))
        logging.info(f"Data loaded into MongoDB collection: {collection_name}")
    except Exception as e:
        logging.error(f"Error loading data into MongoDB: {e}")

# Main ETL pipeline
def etl_pipeline():
    # Fetch data
    weather_data = fetch_weather_data("your_api_key", "Ahmedabad")
    crop_forecast_data = fetch_crop_forecast_data()
    historical_data = fetch_historical_data("path_to_historical_data.csv")

    # Transform data
    weather_df = transform_data(weather_data) if weather_data else None
    crop_forecast_df = transform_data(crop_forecast_data) if crop_forecast_data else None
    historical_df = transform_data(historical_data) if historical_data is not None else None

    # Load data
    if weather_df is not None:
        load_to_postgresql(weather_df, "weather")
        load_to_influxdb(weather_df, "weather_measurement")

    if crop_forecast_df is not None:
        load_to_postgresql(crop_forecast_df, "crop_forecast")

    if historical_df is not None:
        load_to_mongodb(historical_df, "historical_data")

if __name__ == "__main__":
    etl_pipeline()