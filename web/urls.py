from django.urls import path
from . import views
from .views import enviar_email




urlpatterns = [
    path('', views.index, name='index'),
    path('enviar-email/', enviar_email, name='enviar_email'),
    
]
