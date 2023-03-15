from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token


from rest_framework import serializers
from .models import User

def login_user():
    pass



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','password', 'email', 'first_name', 'last_name')
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

