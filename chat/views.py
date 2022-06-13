from rest_framework.generics import GenericAPIView
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

class RegisterView(GenericAPIView):

    serializer_class = UserSerializer

    def post(self,request):
        serializer_obj = self.serializer_class(data=request.data)
        serializer_obj.is_valid(raise_exception=True)
        serializer_obj.save()
        user_data = serializer_obj.data

        user  = User.objects.get(username = user_data['username'])
        Token.objects.create(user = user)
         
        return Response(user_data,status=status.HTTP_201_CREATED)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response =  super(CustomObtainAuthToken,self).post(request, *args, **kwargs)
        token = Token.objects.get(key= response.data['token'])
        user = User.objects.get(id=token.user_id)
        return Response({
            'token':token.key,
            'username':user.username
        })

class SearchUserAPIView(GenericAPIView):
    def get(self,request,name):
        users = User.objects.filter(username__istartswith = name)
        serializer_obj = UserSerializer(users, many=True)
        return Response(serializer_obj.data)