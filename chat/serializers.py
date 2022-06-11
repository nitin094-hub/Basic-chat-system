from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=60,min_length=8,write_only=True)
    class Meta:
        model = User
        fields = ['username','password']

    def validate(self,attrs):
        email = attrs.get('email','')
        username = attrs.get('username','')
        if not username.isalnum():
            raise serializers.ValidationError(
                'Username Should Contain Alphanumeric Characters')
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)