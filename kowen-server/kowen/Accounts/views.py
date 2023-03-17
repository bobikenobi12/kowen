from Accounts.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from django.db.models import Q
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework import generics
from .serializers import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
import bcrypt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.contrib.auth import login
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime 


import json



class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


@api_view(['POST'])
def save_role(request):
    serializer = RoleSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def register_api(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        print(user.pk, '\n')
        user.last_login = datetime.now()
        user.save(update_fields=['last_login'])
        token, created = Token.objects.get_or_create(user=user)
        
        return JsonResponse({'token': token.key})
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
def printing(request):
    authentication_classes = [TokenAuthentication]
    if not request.auth:
        return Response({"msg", "no no no"}, status=status.HTTP_201_CREATED)

    return Response({"msg", "success"}, status=status.HTTP_201_CREATED)








