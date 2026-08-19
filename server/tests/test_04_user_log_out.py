from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json
from rest_framework.authtoken.models import Token
from rich import print


class TestUserLogOut(APITestCase):
    def test_004_user_log_out(self):
        print(
            "\n[bright_yellow]04- user logout test...[/bright_yellow]"
        )

        user = Client()
        sign_up_response = user.post(
            reverse("signup"),
            data={"email": "mg@mg.com", "password": "mg"},
            content_type="application/json",
        )

       

        response_body = json.loads(sign_up_response.content)

        token = response_body["token"]

        

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {response_body['token']}"
        )
        response = self.client.post(reverse("logout"))

        
        try:
            # with self.subTest():
            self.assertEqual(
                response.status_code,
                200,
            )
            tokens = Token.objects.all()
            self.assertEqual(len(tokens), 0)

            print(
                "[bold bright_green]✅04- LOGOUT TEST PASSED✅[/bold bright_green]"
            )

        except AssertionError:
            print(
                "[bold bright_red]❌04- LOGOUT TEST FAILED❌[/bold bright_red]"
            )
            raise
