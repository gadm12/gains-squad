from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from django.conf import settings

COOKIE_MAX_AGE = 60 * 60 * 24 * 7


def set_token_cookie(response, token_key):
    response.set_cookie(
        key="token",
        value=token_key,
        httponly=True,
        secure=settings.AUTH_COOKIE_SECURE,
        samesite=settings.AUTH_COOKIE_SAMESITE,
        max_age=COOKIE_MAX_AGE,
        path="/",
    )
    return response


class CookieAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token_key = request.COOKIES.get("token")
        if not token_key:
            return None
        return self.authenticate_credentials(token_key)


class SignUp(APIView):
    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            new_user = serializer.save()
            token = Token.objects.create(user=new_user)
            response = Response(
                {"user": new_user.email},
                status=status.HTTP_201_CREATED,
            )
            return set_token_cookie(response, token.key)
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

        response = Response(
            {"user": user.email},
            status=status.HTTP_200_OK,
        )
        return set_token_cookie(response, token.key)


class UserView(APIView):
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]


class LogOut(UserView):
    def post(self, request):
        request.user.auth_token.delete()
        response = Response({"message": "Successfully logged out."})
        response.delete_cookie("token", path="/")
        return response

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
