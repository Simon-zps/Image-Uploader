from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.test, name='index'),
    path('images', views.get_uploaded_images, name='getuploadedImages'),
    path('upload-image', views.upload_image, name='uploadImage'),
]
