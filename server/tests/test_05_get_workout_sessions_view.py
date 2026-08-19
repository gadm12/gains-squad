from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rich import print
from user_app.models import User
from workout_app.models import WorkoutSession


class TestWorkoutSessionView(APITestCase):

    def test_get_workout_sessions(self):
        print(
            "\n[bright_yellow] 05- get workout sessions view test...[/bright_yellow]"
        )

        print(
            "[bright_blue]    part 1 - get workout sessions...[/bright_blue]"
        )

        user = User.objects.create_user(
            email="mg@mg.com",
            password="mg",
        )

        token = Token.objects.create(user=user)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {token.key}"
        )

        WorkoutSession.objects.create(
            user=user,
            routine="push",
            name="Push Day",
        )

        WorkoutSession.objects.create(
            user=user,
            routine="legs",
            name="Leg Day",
        )

        response = self.client.get(reverse("workout-sessions"))

        # print("\nSTATUS:", response.status_code)
        # print("RESPONSE:", response.json())
        try:
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.json()), 2)
            self.assertEqual(
                response.json()[1]["routine"],
                "legs",
            )
            print(
                "[bold bright_green]    ✅ part 1 - GET SESSIONS TEST PASSED ✅[/bold bright_green]"
            )

        except AssertionError:
            print(
                "[bold bright_red]    ❌ part 1 - GET SESSIONS TEST FAILED ❌[/bold bright_red]"
            )
            raise

    def test_only_returns_logged_in_users_sessions(self):

        print(
            "\n[bright_blue]    part 2 - return logged in users sessions...[/bright_blue]"
        )

        user1 = User.objects.create_user(
            email="one@test.com",
            password="test",
        )

        user2 = User.objects.create_user(
            email="two@test.com",
            password="test",
        )

        token = Token.objects.create(user=user1)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {token.key}"
        )

        WorkoutSession.objects.create(
            user=user1,
            routine="push",
            name="User One Workout",
        )

        WorkoutSession.objects.create(
            user=user2,
            routine="legs",
            name="User Two Workout",
        )

        response = self.client.get(reverse("workout-sessions"))

        try:
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.json()), 1)
            self.assertEqual(
                response.json()[0]["name"],
                "User One Workout",
            )
            print(
                "[bold bright_green]    ✅ part 2 - RETURN LOGGED IN USERS SESSIONS PASSED ✅[/bold bright_green]"
            )
        except AssertionError:
            print(
                "[bold bright_red]    ❌ part 2 - RETURN LOGGED IN USERS SESSIONS FAILED ❌[/bold bright_red]"
            )
            raise

    def test_requires_authentication(self):

        print(
            "\n[bright_blue]    part 3 - requires authentication...[/bright_blue]"
        )
        response = self.client.get(reverse("workout-sessions"))
        try:
            self.assertEqual(response.status_code, 401)
            print(
                "[bold bright_green]    ✅ part 3 - REQUIRES AUTHENTICATION PASSED✅[/bold bright_green]"
            )
        except AssertionError:
            print(
                "[bold bright_red]    ❌ part 3 - REQUIRES AUTHENTICATION FAILED ❌[/bold bright_red]"
            )
            raise
