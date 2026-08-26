from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from user_app.models import User
from workout_app.models import WorkoutSession


class TestGetWorkoutSessionView(APITestCase):

    def authenticate_user(self, user):
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        self.client.cookies["access"] = access

    def test_get_workout_sessions(self):
        user = User.objects.create_user(
            email="mg@mg.com",
            password="mg",
        )

        self.authenticate_user(user)

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

        response = self.client.get(reverse("workout_sessions"))

        with self.subTest("request succeeds"):
            self.assertEqual(
                response.status_code,
                200,
            )

        with self.subTest("returns two sessions"):
            self.assertEqual(
                len(response.json()),
                2,
            )

        with self.subTest("returns correct session data"):
            self.assertEqual(
                response.json()[1]["routine"],
                "legs",
            )

    def test_only_returns_logged_in_users_sessions(self):
        user1 = User.objects.create_user(
            email="one@test.com",
            password="test",
        )

        user2 = User.objects.create_user(
            email="two@test.com",
            password="test",
        )

        self.authenticate_user(user1)

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

        response = self.client.get(reverse("workout_sessions"))

        with self.subTest("request succeeds"):
            self.assertEqual(
                response.status_code,
                200,
            )

        with self.subTest(
            "returns only logged in users session"
        ):
            self.assertEqual(
                len(response.json()),
                1,
            )

        with self.subTest("returns correct users session"):
            self.assertEqual(
                response.json()[0]["name"],
                "User One Workout",
            )

    def test_requires_authentication(self):
        response = self.client.get(reverse("workout_sessions"))

        with self.subTest("unauthenticated request is rejected"):
            self.assertEqual(
                response.status_code,
                401,
            )
