from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json



class TestUserInfo(APITestCase):
    def test_003_user_info(self):
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
        response = self.client.get(reverse("info"))
        with self.subTest():
            self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["email"],
            "mg@mg.com",
        )
