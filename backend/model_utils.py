from transformers import pipeline
import os

# Set Hugging Face access token
os.environ["HF_HOME"] = "./hf_cache"  # Optional: Cache directory for models
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "your_access_token_here"

# Load the Hugging Face pipeline for LLAMA model
llama_pipeline = pipeline("text-generation", model="meta-llama/Llama-2-7b-hf")

def get_llama_response(query):
    """Generate a response using the LLAMA model."""
    response = llama_pipeline(query, max_length=100, num_return_sequences=1)
    return response[0]['generated_text']