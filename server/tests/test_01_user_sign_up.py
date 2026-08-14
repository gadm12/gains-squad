from django.test import TestCase, Client
from django.urls import reverse
from rich import print


class TestUserSignUP(TestCase):

    def test_001_user_sign_up(self):
        print(
            "\n[bright_yellow]01- user sign up test...[/bright_yellow]"
        )

        client = Client()
        response = client.post(
            reverse("signup"),
            data={"email": "mg@mg.com", "password": "mg"},
            content_type="application/json",
        )

        # print(
        #     "[bright_cyan]sign up status:[/bright_cyan]",
        #     response.status_code,
        # )
        # print(
        #     "[bright_cyan]sign up response:[/bright_cyan]",
        #     response.content,
        # )

        try:
            # with self.subTest():
            self.assertEqual(response.status_code, 201)
            self.assertTrue(
                b'{"user":"mg@mg.com"' in response.content
                and b"token" in response.content
            )
            print(
                "[bold bright_green]✅01- SIGN UP TEST PASSED✅[/bold bright_green]"
            )
        except AssertionError:
            print(
                "[bold bright_red]❌01- SIGN UP TEST FAILED❌[/bold bright_red]"
            )
            raise
