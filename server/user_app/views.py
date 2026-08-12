from rest_framework.views import APIView
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


class SignUp(APIView):
    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            new_user = serializer.save()
            token = Token.objects.create(user=new_user)
            return Response(
                {"user": new_user.email, "token": token.key},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )


class LogIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(
            request, email=email, password=password
        )
        if not user:
            return Response(
                "invalid email or password",
                status=status.HTTP_404_NOT_FOUND,
            )
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {"user": user.email, "token": token.key},
            status=status.HTTP_200_OK,
        )


class LogOut(APIView):
    pass


class UserInfo(APIView):
    pass
