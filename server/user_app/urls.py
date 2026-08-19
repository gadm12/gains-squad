from django.urls import path
from .views import SignUp, LogIn, LogOut, UserInfo

#! http://127.0.0.1:8000/api/v1/users/

urlpatterns = [
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", LogIn.as_view(), name="login"),
    path("logout/", LogOut.as_view(), name="logout"),
    path("info/", UserInfo.as_view(), name="info"),
]
