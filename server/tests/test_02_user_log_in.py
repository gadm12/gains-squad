from django.test import TestCase, Client
from django.urls import reverse
from rich import print


class TestUserLogIn(TestCase):
    def test_002_user_sign_in(self):
        user = Client()
        user.post(
            reverse("signup"),
            data={"email": "mg@mg.com", "password": "mg"},
            content_type="application/json",
        )
        response = user.post(
            reverse("login"),
            data={"email": "mg@mg.com", "password": "mg"},
            content_type="application/json",
        )
        print(response.content)
        with self.subTest():
            self.assertEqual(response.status_code, 200)
            self.assertTrue(
                b'{"user":"mg@mg.com"' in response.content
                and b"token" in response.content
            )
