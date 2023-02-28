from rest_framework import serializers
from .models import User, Role
from rest_framework.authtoken.models import Token


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name', 'description', 'role_permissions')
        extra_kwargs = {'role_permissions': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        role = Role.objects.create(**validated_data)
        return role

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user




class UserSerializerWithToken(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


