from django.test import TestCase, Client
from django.urls import reverse
from rich import print


class TestUserLogIn(TestCase):
    def test_002_user_sign_in(self):
        print(
            "\n[bright_yellow]02- user login test...[/bright_yellow]"
        )

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
        # print(
        #     "[bold magenta]login status:[/bold magenta]",
        #     response.status_code,
        # )
        # print(
        #     "[bold magenta]login response:[/bold magenta]",
        #     response.content,
        # )
        try:
            # with self.subTest():
            self.assertEqual(response.status_code, 200)
            self.assertTrue(
                b'{"user":"mg@mg.com"' in response.content
                and b"token" in response.content
            )
            print(
                "[bold bright_green]✅02- LOGIN TEST PASSED✅[/bold bright_green]"
            )

        except AssertionError:
            print(
                "[bold bright_red]❌02- LOGIN TEST FAILED❌[/bold bright_red]"
            )
            raise
