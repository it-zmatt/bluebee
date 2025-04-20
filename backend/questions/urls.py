from django.urls import path
from .views import *

urlpatterns = [
    path('', QuestionListCreateAPIView.as_view(), name='question-list-create'),
    path('history/', QuestionListView.as_view(), name='history'),
    path('history/<int:id>/', QuestionDetailView.as_view(), name='question-detail'),
]
