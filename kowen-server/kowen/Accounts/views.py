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

import json


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CreateRoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer


@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():

        password = serializer.validated_data.get("password").encode('utf-8')
        hashedPassword = bcrypt.hashpw(password, bcrypt.gensalt())
        serializer.validated_data["password"] = hashedPassword
        print(serializer.validated_data.get("password"))

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    hashedPassword = bcrypt.hashpw(password, bcrypt.gensalt())
    user = authenticate(username=username, password=hashedPassword)

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)

    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


# from django.contrib.auth.models import User


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if username is None or password is None:
            return Response({'error': 'Please provide both username/email and password'},
                            status=status.HTTP_400_BAD_REQUEST)
        # check if the username/email exists in the User table
        user = User.objects.filter(
            Q(username=username) | Q(email=username)).first()
        if user is None:
            return Response({'error': 'Invalid username/email or password'},
                            status=status.HTTP_400_BAD_REQUEST)
        # authenticate the user
        user = authenticate(username=user.username, password=password)
        if not user:
            return Response({'error': 'Invalid username/email or password'},
                            status=status.HTTP_401_UNAUTHORIZED)
        # create a token for the user
        token, _ = Token.objects.get_or_create(user=user)
        # login the user
        login(request, user)
        # return the token
        return Response({'token': token.key})
