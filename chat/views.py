from rest_framework.generics import GenericAPIView
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

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
