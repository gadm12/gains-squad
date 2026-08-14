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

        # print(
        #     "[bright_cyan]SIGN UP STATUS:[/bright_cyan]",
        #     sign_up_response.status_code,
        # )
        # print(
        #     "[bright_cyan]SIGNUP RESPONSE:[/bright_cyan]",
        #     sign_up_response.json(),
        # )

        response_body = json.loads(sign_up_response.content)

        token = response_body["token"]

        # print(
        #     "[bold yellow]TOKEN:[/bold yellow]",
        #     token,
        # )
        # print(
        #     "[bold yellow]TOKENS BEFORE LOGOUT:[/bold yellow]",
        #     Token.objects.count(),
        # )

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {response_body['token']}"
        )
        response = self.client.post(reverse("logout"))

        # print(
        #     "[bold magenta]LOGOUT STATUS:[/bold magenta]",
        #     response.status_code,
        # )
        # print(
        #     "[bold magenta]LOGOUT RESPONSE:[/bold magenta]",
        #     response.content,
        # )
        # print(
        #     "[bold yellow]TOKENS AFTER LOGOUT:[/bold yellow]",
        #     Token.objects.count(),
        # )
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
