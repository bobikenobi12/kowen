from rest_framework import generics
from .serializers import *
from .forms import RegistrationForm

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer 

class CreateRoleView(generics.CreateAPIView):
    serializer_class = RoleSerializer

def signup(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
    else:
        form = RegistrationForm()