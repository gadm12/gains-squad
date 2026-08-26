from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt import RefreshToken
from rest_framework_simplejwt import TokenError
from rest_framework_simplejwt import api_settings


from django.contrib.auth import authenticate
from django.conf import settings

from .serializers import UserSerializer

ACCESS_MAX_AGE = int(
    settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()
)
REFRESH_MAX_AGE = int(
    settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()
)
REFRESH_COOKIE_PATH = "/api/v1/users"


def set_auth_cookies(response, access=None, refresh=None):
    common = {
        "httponly": True,
        "secure": settings.AUTH_COOKIE_SECURE,
        "samesite": settings.AUTH_COOKIE_SAMESITE,
    }

    if access:
        response.set_cookie(
            "access",
            access,
            max_age=ACCESS_MAX_AGE,
            path="/",
            **common
        )
    if refresh:
        response.set_cookie(
            "refresh",
            refresh,
            max_age=REFRESH_MAX_AGE,
            path=REFRESH_COOKIE_PATH,
            **common
        )

    return response


def clear_auth_cookies(response):
    response.delete_cookie(
        "access",
        path="/",
    )
    response.delete_cookie(
        "refresh",
        path=REFRESH_COOKIE_PATH,
    )
    return response


def token_for(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token), str(refresh)


class SignUp(APIView):
    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            new_user = serializer.save()
            access, refresh = token_for(new_user)
            response = Response(
                {"user": new_user.email},
                status=status.HTTP_201_CREATED,
            )
            return set_auth_cookies(response, access, refresh)
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
        access, refresh = token_for(user)

        response = Response(
            {"user": user.email},
            status=status.HTTP_200_OK,
        )
        return set_auth_cookies(response, access, refresh)


class RefreshView(APIView):
    def post(self, request):
        raw_refresh = request.COOKIES.get("refresh")
        if not raw_refresh:
            return Response(
                {"detail": "No refresh Token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        try:
            refresh = RefreshToken(raw_refresh)
        except TokenError:
            return clear_auth_cookies(
                Response(
                    {
                        "detail": "Invalid or expired refresh token"
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            )
        access = str(refresh.access_token)

        new_refresh = None

        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    refresh.blacklist()
                except AttributeError:
                    pass
            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()
            new_refresh = str(refresh)
        response = Response({"refreshed": True})
        return set_auth_cookies(response, access, new_refresh)


class UserView(APIView):
    permission_classes = [IsAuthenticated]


class LogOut(UserView):
    def post(self, request):
        raw_refresh = request.COOKIES.get("refresh")
        if raw_refresh:
            try:
                RefreshToken(raw_refresh).blacklist()
            except TokenError:
                pass

        return clear_auth_cookies(
            Response({"details": "logged out"})
        )


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
