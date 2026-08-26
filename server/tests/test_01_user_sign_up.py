from django.test import TestCase, Client
from django.urls import reverse


class TestUserSignUP(TestCase):
    def test_001_user_sign_up(self):
        client = Client()

        response = client.post(
            reverse("signup"),
            data={
                "email": "mg@mg.com",
                "password": "mg",
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        self.assertEqual(
            response.json()["user"],
            "mg@mg.com",
        )

        self.assertIn("access", response.cookies)
        self.assertIn("refresh", response.cookies)

        self.assertTrue(
            response.cookies["access"]["httponly"]
        )

        self.assertTrue(
            response.cookies["refresh"]["httponly"]
        )