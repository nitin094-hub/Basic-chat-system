from rest_framework import serializers
from django.contrib.auth.models import User

from chat.models import Message, MessageThread

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=60,min_length=8,write_only=True)
    class Meta:
        model = User
        fields = ['id','username','password']

    def validate(self,attrs):
        email = attrs.get('email','')
        username = attrs.get('username','')
        if not username.isalnum():
            raise serializers.ValidationError(
                'Username Should Contain Alphanumeric Characters')
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class MessageSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%d/%b/%y %H:%M:%S",read_only = True)
    sent_by = serializers.ReadOnlyField(source = 'sent_by.username')
    class Meta:
        model = Message
        fields = "__all__"

class MessageThreadSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many = True, read_only = True)
    first_user = serializers.ReadOnlyField(source = 'first_user.username')
    second_user = serializers.ReadOnlyField(source = 'second_user.username')
    class Meta:
        model = MessageThread
        fields = ['id','first_user','second_user','messages']