from rest_framework import serializers
from .models import User, Role
from rest_framework.authtoken.models import Token


from rest_framework import serializers
from .models import User, Role


from rest_framework import serializers
from .models import User, Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',
                  'first_name', 'last_name', 'roles', 'created_at')
        fields = ('id', 'username', 'password', 'email',
                  'first_name', 'last_name', 'roles')

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',
                  'first_name', 'last_name', 'roles', 'created_at')
