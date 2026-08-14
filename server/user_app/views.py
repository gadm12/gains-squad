from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

# from rest_framework.throttling import UserRateThrottle


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
                status=status.HTTP_401_UNAUTHORIZED,
            )
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {"user": user.email, "token": token.key},
            status=status.HTTP_200_OK,
        )


class UserView(APIView):
    permission_classes = [IsAuthenticated]


class LogOut(UserView):
    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Successfully logged out."})


class UserInfo(UserView):
    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "date_of_birth": user.date_of_birth,
                "weight": user.weight,
                "height": user.height,
                "date_joined": user.date_joined,
            }
        )
