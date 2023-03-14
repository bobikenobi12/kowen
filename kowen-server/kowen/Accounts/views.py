from rest_framework import generics
from .serializers import *
from .forms import RegistrationForm
import json


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CreateRoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer


def signup(request):
    if request.method == 'POST':
        json.parse(request.body)
    else:
        form = RegistrationForm()
