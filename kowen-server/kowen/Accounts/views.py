from rest_framework import generics
from .serializers import *

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

class CreateRoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer