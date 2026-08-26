from django.urls import reverse
from rest_framework.test import APITestCase


class TestUserInfo(APITestCase):
    def test_003_user_info(self):
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

        response = self.client.get(reverse("info"))

        with self.subTest("user info request succeeds"):
            self.assertEqual(
                response.status_code,
                200,
            )

        with self.subTest("correct user is returned"):
            self.assertEqual(
                response.json()["email"],
                "mg@mg.com",
            )
