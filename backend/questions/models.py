from django.db import models
from users.models import User  # Adjust this import to match your User model

class Question(models.Model):
    q_id = models.AutoField(primary_key=True)
    question = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')
    ticket = models.CharField(max_length=255, blank=True, null=True)  # For classification result
    answer = models.TextField(blank=True, null=True)  # New field for Gemini-generated answer
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Question {self.q_id}: {self.question[:50]}"
