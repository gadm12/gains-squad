from django.test import TestCase, Client
from django.urls import reverse


class TestUserLogIn(TestCase):
    def test_002_user_sign_in(self):
        client = Client()

        client.post(
            reverse("signup"),
            data={
                "email": "mg@mg.com",
                "password": "mg",
            },
            content_type="application/json",
        )

        response = client.post(
            reverse("login"),
            data={
                "email": "mg@mg.com",
                "password": "mg",
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json()["user"],
            "mg@mg.com",
        )

        self.assertIn("access", response.cookies)
        self.assertIn("refresh", response.cookies)

        self.assertTrue(response.cookies["access"]["httponly"])

        self.assertTrue(response.cookies["refresh"]["httponly"])
