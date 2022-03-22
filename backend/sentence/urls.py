from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('api/auth/login', views.AuthRedirectAPIView.as_view()),
    path('api/auth/callback', views.AuthAndGenAPIView.as_view()),
    path('api/auth/delete', views.AuthAndDelAPIView.as_view()),

    path('api/make_sentence/<screen_name>', views.GenTextAPIView.as_view()),

    # Twitter card image
    path('api/ogp/<screen_name>', views.GenImageAPIView.as_view()),
]
