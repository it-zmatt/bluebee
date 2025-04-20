from transformers import AutoTokenizer, AutoModelForSequenceClassification

class TicketClassifier:
    def __init__(self):
        try:
            # Load tokenizer and model directly from Hugging Face Hub
            self.tokenizer = AutoTokenizer.from_pretrained("moetao/bluebee-model")
            self.model = AutoModelForSequenceClassification.from_pretrained("moetao/bluebee-model")
            print("Model outputs", self.model.config.num_labels, "classes.")

        except Exception as e:
            raise RuntimeError(f"Failed to load model or tokenizer from Hugging Face Hub: {e}")

        # Updated classification categories
        self.labels = [
            "software support",         # 0
            "wifi support",             # 1
            "printer support",          # 2
            "network account support",  # 3
            "VPN support",            # 4
            "account deletion support", # 5 
        ]

    def predict(self, text):
        try:
            inputs = self.tokenizer(
                text, return_tensors="pt", truncation=True, max_length=512
            )
            outputs = self.model(**inputs)
            predicted_class = outputs.logits.argmax(dim=1).item()
            return self.labels[predicted_class]
        except Exception as e:
            raise RuntimeError(f"Error during prediction: {e}")
