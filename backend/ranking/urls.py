from django.urls import path
from . import views

urlpatterns = [
    path('api/ranking', views.RankingGenerateAPIView.as_view()),
]
