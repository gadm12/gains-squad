from rest_framework.views import APIView
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
# from .serializers import ClientSerializer



class SignUp(APIView):
    pass

class LogIn(APIView):
    pass

class LogOut(APIView):
    pass

class UserInfo(APIView):
    pass