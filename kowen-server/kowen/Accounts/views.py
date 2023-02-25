# use django rest api createa login, logout, register, and profile page

# Path: kowen-server/kowen/Accounts/views.py

from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.contrib.auth import login
from django.contrib.auth import authenticate
# use djangorestframework to create a login, logout, register, and profile page
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import UserSerializer
from .serializers import UserSerializerWithToken
from .serializers import RoleSerializer
from .serializers import UserGroupSerializer
from .serializers import MembershipSerializer
from .serializers import AdminshipSerializer
from .serializers import GroupRoleSerializer
from .serializers import GroupPermissionSerializer
from .serializers import GroupPermissionRoleSerializer
from .serializers import GroupPermissionUserSerializer
from .models import User
from .models import Role
from .models import UserGroup
from .models import Membership
from .models import Adminship
from .models import GroupRole
from .models import GroupPermission
from .models import GroupPermissionRole
from .models import GroupPermissionUser
from  form import LoginForm 

# Create your views here.


def login_view(request):
    title = "Login"

    if request.method == 'POST':

        form = LoginForm(data=request.POST)
        email = request.POST.get('email', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=email, password=password)
        if form.is_valid():
            auth.login(request, user)
            user_type = form.cleaned_data['Label']
            if user.is_active:
                return HttpResponseRedirect('/post_load/')
            elif user_type == 'Company':
                return HttpResponseRedirect('/live_deal/')
    else:
        form = LoginForm()

    return render(request, 'registration/login.html', {'form' : form, 'title': title})