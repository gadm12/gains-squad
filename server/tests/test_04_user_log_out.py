from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
)


class TestUserLogOut(APITestCase):
    def test_004_user_log_out(self):
        sign_up_response = self.client.post(
            reverse("signup"),
            data={
                "email": "mg@mg.com",
                "password": "mg",
            },
            format="json",
        )

        with self.subTest("signup succeeds"):
            self.assertEqual(
                sign_up_response.status_code,
                201,
            )

        with self.subTest("JWT cookies are set"):
            self.assertIn(
                "access",
                sign_up_response.cookies,
            )
            self.assertIn(
                "refresh",
                sign_up_response.cookies,
            )

        response = self.client.post(
            reverse("logout"),
        )

        with self.subTest("logout succeeds"):
            self.assertEqual(
                response.status_code,
                200,
            )

        with self.subTest("auth cookies are cleared"):
            self.assertEqual(
                response.cookies["access"]["max-age"],
                0,
            )
            self.assertEqual(
                response.cookies["refresh"]["max-age"],
                0,
            )

        with self.subTest("refresh token is blacklisted"):
            self.assertEqual(
                BlacklistedToken.objects.count(),
                1,
            )

        response = self.client.get(
            reverse("info"),
        )

        with self.subTest("protected route is blocked after logout"):
            self.assertEqual(
                response.status_code,
                401,
            )