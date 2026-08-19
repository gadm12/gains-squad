from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json
from rich import print


class TestUserInfo(APITestCase):
    def test_003_user_info(self):
        print(
            "\n[bright_yellow]03- user info test...[/bright_yellow]"
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

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {response_body['token']}"
        )

        response = self.client.get(reverse("info"))
        # print("[bright_magenta]INFO:[/bright_magenta]", response)

        try:
            # with self.subTest():
            self.assertEqual(response.status_code, 200)
            self.assertEqual(
                response.json()["email"],
                "mg@mg.com",
            )
            print(
                "[bold bright_green] ✅03- USER INFO TEST PASSED✅[/bold bright_green]"
            )
        except AssertionError:
            print(
                "[bold bright_red] ❌03- USER INFO TEST FAILED❌[/bold bright_red]"
            )
            raise
