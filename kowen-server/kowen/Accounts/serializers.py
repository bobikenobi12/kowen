from rest_framework import serializers
from .models import User, Role
from rest_framework.authtoken.models import Token


from rest_framework import serializers
from .models import User

def login_user():
    pass

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')
    def create(self, validated_data):
        role = Role.objects.create(**validated_data)
        return role

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','password', 'email', 'first_name', 'last_name', 'roles')
    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     return user

