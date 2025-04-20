from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer
from .ml.model import TicketClassifier
from .ml.gemini_helper import GeminiHelper
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore
from rest_framework.views import APIView # type: ignore


@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
class QuestionListView(APIView):
    def get(self, request):
        # Fetch only the questions for the authenticated user
        questions = Question.objects.filter(user=request.user)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
class QuestionDetailView(APIView):
    def get(self, request, id):
        # Fetch the specific question for the authenticated user using q_id
        question = get_object_or_404(Question, q_id=id, user=request.user)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
class QuestionListCreateAPIView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Initialize the classifiers
        classifier = TicketClassifier()
        gemini = GeminiHelper()

        # Get the question text and predict ticket type
        question_text = serializer.validated_data['question']
        ticket = classifier.predict(question_text)

        # Generate answer using Gemini
        answer = gemini.generate_response(question_text, ticket)

        # Log for debugging
        print(f"Question: {question_text}, Predicted Type: {ticket}")
        print(f"Generated Answer: {answer}")

        # Save the question with the predicted ticket type and answer
        serializer.save(
            user=self.request.user,
            ticket=ticket,
            answer=answer
        )

    def create(self, request, *args, **kwargs):
        # Override create method to add a custom response
        response = super().create(request, *args, **kwargs)
        question = self.get_queryset().last()
        response.data['ticket'] = question.ticket
        response.data['answer'] = question.answer
        return response