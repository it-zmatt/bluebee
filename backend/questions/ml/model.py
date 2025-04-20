import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification

class TicketClassifier:
    def __init__(self):
        # Dynamically set the model path
        self.model_dir = os.path.join(os.path.dirname(__file__), "models/trained_model")

        # Ensure the model directory exists
        if not os.path.isdir(self.model_dir):
            raise ValueError(f"Model directory not found: {self.model_dir}")

        try:
            # Load the tokenizer and model
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_dir)
            self.model = AutoModelForSequenceClassification.from_pretrained(self.model_dir)
        except Exception as e:
            raise RuntimeError(f"Failed to load model or tokenizer from {self.model_dir}: {e}")

        # Define the updated classification categories
        self.labels = [
            "software support",   # 0
            "wifi support",       # 1
            "printer support",    # 2
            "network account support",  # 3
            "other support",      # 4
        ]

    def predict(self, text):
        try:
            # Tokenize the input text
            inputs = self.tokenizer(
                text, return_tensors="pt", truncation=True, max_length=512
            )

            # Get predictions
            outputs = self.model(**inputs)
            predicted_class = outputs.logits.argmax(dim=1).item()  # Choose the class with the highest score

            # Return the label corresponding to the predicted class index
            return self.labels[predicted_class]
        except Exception as e:
            raise RuntimeError(f"Error during prediction: {e}")
