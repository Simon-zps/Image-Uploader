from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Image
from django.conf import settings
from .serializers import ImageSerializer
import requests
from django.core.files.storage import FileSystemStorage


@api_view(['GET'])
def test(request):
    return Response({"Message":"Set up API"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_uploaded_images(request):
    images = Image.objects.all().order_by('-created')
    data = []

    for image in images:
        image_url = request.build_absolute_uri(settings.MEDIA_URL +image.name)
        image_data = {
            'url': image_url,
            'created': image.created,
        }

        data.append(image_data)

    if data:
        return Response(data, status=status.HTTP_200_OK)
    return Response({"message":"No images"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST' and request.FILES['image']:
        image = request.FILES['image']
        image_name = request.FILES['image'].name.replace(" ", "_") #replace spaces with underscores
        fs = FileSystemStorage()
        filename = fs.save(image_name, image)
        uploaded_file_url = fs.url(filename)
        
        img = Image(name=image_name, image=image)
        img.save()

        # Image was successfully uploaded to API
        return Response({'Image uploaded successfully': "yes"})
        
    else:
        # No image file was submitted
        return Response({'no image': ":("})

