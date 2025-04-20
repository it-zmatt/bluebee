import os
from dotenv import load_dotenv
import google.generativeai as genai

class GeminiHelper:
    def __init__(self):
        """Initialize the Gemini API with secure API key management."""
        # Load environment variables
        load_dotenv()
        
        # Get API key from environment
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables. Please check your .env file.")

        try:
            genai.configure(api_key=api_key)

            # List available models
            self.available_models = [model.name for model in genai.list_models()]
            print("Available models:", self.available_models)

            # Select an appropriate model
            self.model_name = "models/gemini-1.5-pro-latest"  # Change this if needed
            if self.model_name not in self.available_models:
                raise ValueError(f"Selected model '{self.model_name}' is not available.")

            self.model = genai.GenerativeModel(self.model_name)

            # Configure generation parameters
            self.generation_config = {
                "temperature": 0.7,
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 1024,
            }

        except Exception as e:
            print(f"Failed to initialize Gemini API: {e}")
            self.model = None

    def generate_response(self, question: str, ticket_type: str) -> str:
        """Generates an AI-based response for IT support issues."""
        if not self.model:
            return "AI service is currently unavailable. Please try again later."

        try:
            prompt = f"""
            You are a helpful IT support assistant. Please provide a solution for the following issue:

            **User's Question:** {question}
            **Issue Category:** {ticket_type}

            Please provide:
            1. A clear explanation of the potential cause.
            2. Step-by-step instructions to resolve the issue.
            3. Any additional recommendations or preventive measures.

            Keep the response professional and easy to understand.


            DO NOT include subject or signatures in or email format make it tutorial format.

            """

            response = self.model.generate_content(prompt, generation_config=self.generation_config)
            
            return response.text if response and response.text else "I couldn't generate a response. Please try again."

        except Exception as e:
            print(f"Error generating Gemini response: {e}")
            return "I encountered an error while generating the response. Please try again later."

# Example usage:
if __name__ == "__main__":
    gemini = GeminiHelper()
    question = "I have an issue connecting to the WiFi."
    ticket_type = "wifi support"
    answer = gemini.generate_response(question, ticket_type)
    print(answer)
