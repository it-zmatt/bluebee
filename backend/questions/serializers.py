from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['q_id', 'question', 'user', 'ticket', 'answer', 'created_at']
        read_only_fields = ['q_id', 'user', 'ticket', 'answer', 'created_at']
