from django.test import TestCase, Client
from django.urls import reverse


class TestUserSignUP(TestCase):

    def test_001_user_sign_up(self):
        user = Client()
        response = user.post(
            reverse("signup"),
            data={"email": "mg@mg.com", "password": "mg"},
            content_type="application/json",
        )
        with self.subTest():
            self.assertEqual(response.status_code, 201)
        self.assertTrue(
            b'{"user":"mg@mg.com"}' in response.content
            and b"token" in response.content
        )
