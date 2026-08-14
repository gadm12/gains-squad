from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json
from rest_framework.authtoken.models import Token


class TestUserLogOut(APITestCase):
    def test_004_user_log_out(self):
        user = Client()
        sign_up_response = user.post(
            reverse("signup"),
            data={"email": "mg@mg.com", "password": "mg"},
            content_type="application/json",
        )
        response_body = json.loads(sign_up_response.content)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {response_body['token']}"
        )
        response = self.client.post(reverse("logout"))
        with self.subTest():
            self.assertEqual(
                response.status_code,
                200,
            )
            tokens = Token.objects.all()
            self.assertEqual(len(tokens), 0)
