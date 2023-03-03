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
