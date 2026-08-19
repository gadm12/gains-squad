from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rich import print
from user_app.models import User
from workout_app.models import WorkoutSession


class TestPostWorkoutSessionView(APITestCase):

    def test_post_workout_sessions(self):

        print(
            "\n[bright_yellow]06- post workout sessions view test...[/bright_yellow]"
        )

        user = User.objects.create_user(
            email="mg@mg.com",
            password="mg",
        )

        token = Token.objects.create(user=user)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {token.key}"
        )

        response = self.client.post(
            reverse("workout_sessions"),
            data={
                "routine": "push",
                "name": "Friday",
            },
            format="json",
        )  
        try:
            self.assertEqual(response.status_code, 201)

            self.assertEqual(
                response.json()["routine"], 
                "push",
            )
            print(
                "[bold bright_green] ✅ test 06 - POST SESSIONS TEST PASSED ✅[/bold bright_green]"
            )

        except AssertionError:
            print(
                "[bold bright_red] ❌ test 06 - POST SESSIONS TEST FAILED ❌[/bold bright_red]"
            )
            raise
