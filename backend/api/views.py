# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import action
# from django.shortcuts import get_object_or_404
# from .models import Question
# from .serializers import QuestionSerializer, QuestionDetailSerializer

# class QuestionViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     serializer_class = QuestionSerializer

#     def get_queryset(self):
#         return Question.objects.filter(user=self.request.user).order_by('-created_at')

#     def get_serializer_class(self):
#         if self.action == 'retrieve':
#             return QuestionDetailSerializer
#         return QuestionSerializer

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

#     @action(detail=False, methods=['get'])
#     def history(self, request):
#         questions = self.get_queryset()
#         serializer = self.get_serializer(questions, many=True)
#         return Response(serializer.data)

#     def retrieve(self, request, pk=None):
#         queryset = Question.objects.filter(user=request.user)
#         question = get_object_or_404(queryset, pk=pk)
#         serializer = QuestionDetailSerializer(question)
#         return Response(serializer.data)

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             # Add your AI processing logic here
#             question = serializer.validated_data['question']
            
#             # Example response (replace with your actual AI processing)
#             answer = "This is a sample answer."
#             ticket_type = "General Inquiry"
            
#             # Save with processed data
#             serializer.save(
#                 user=request.user,
#                 answer=answer,
#                 ticket=ticket_type
#             )
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 