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

# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the Accounts index.")

# use django rest api createa login, logout, register, and profile page


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserViewSetWithToken(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    permission_classes = [permissions.IsAuthenticated]


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserGroupViewSet(viewsets.ModelViewSet):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated]


class AdminshipViewSet(viewsets.ModelViewSet):
    queryset = Adminship.objects.all()
    serializer_class = AdminshipSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupRoleViewSet(viewsets.ModelViewSet):
    queryset = GroupRole.objects.all()
    serializer_class = GroupRoleSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupPermissionViewSet(viewsets.ModelViewSet):
    queryset = GroupPermission.objects.all()
    serializer_class = GroupPermissionSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupPermissionRoleViewSet(viewsets.ModelViewSet):
    queryset = GroupPermissionRole.objects.all()
    serializer_class = GroupPermissionRoleSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupPermissionUserViewSet(viewsets.ModelViewSet):
    queryset = GroupPermissionUser.objects.all()
    serializer_class = GroupPermissionUserSerializer
    permission_classes = [permissions.IsAuthenticated]

# use djangorestframework to create a login, logout, register, and profile page
# class LoginView(ObtainAuthToken):


# switch branch from main to accounts-app command
# git checkout -b accounts-app
