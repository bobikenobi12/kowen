from rest_framework import serializers
from .models import User, Role, UserGroup, Membership, Adminship, GroupRole, GroupPermission, GroupPermissionRole, GroupPermissionUser
from rest_framework.authtoken.models import Token


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

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


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name', 'description',
                  'role_picture', 'role_color', 'role_icon')


class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        fields = ('id', 'name', 'description',
                  'group_picture', 'group_color', 'group_icon')


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('id', 'user', 'group', 'date_joined')


class AdminshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adminship
        fields = ('id', 'user', 'group', 'date_joined')


class GroupRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupRole
        fields = ('id', 'group', 'role', 'date_created')


class GroupPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPermission
        fields = ('id', 'name', 'description', 'group_permission_picture',
                  'group_permission_color', 'group_permission_icon', 'group_permission')


class GroupPermissionRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPermissionRole
        fields = ('id', 'group', 'role', 'group_permission', 'date_created')


class GroupPermissionUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPermissionUser
        fields = ('id', 'group', 'user', 'group_permission')
