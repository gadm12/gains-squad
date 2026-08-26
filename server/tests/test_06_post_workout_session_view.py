from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from user_app.models import User
from workout_app.models import WorkoutSession


class TestPostWorkoutSessionView(APITestCase):
    def test_post_workout_sessions(self):
        user = User.objects.create_user(
            email="mg@mg.com",
            password="mg",
        )

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        self.client.cookies["access"] = access

        response = self.client.post(
            reverse("workout_sessions"),
            data={
                "routine": "push",
                "name": "Friday",
            },
            format="json",
        )

        with self.subTest("session is created"):
            self.assertEqual(
                response.status_code,
                201,
            )

        with self.subTest("response contains correct routine"):
            self.assertEqual(
                response.json()["routine"],
                "push",
            )

        with self.subTest("session is saved to database"):
            self.assertEqual(
                WorkoutSession.objects.count(),
                1,
            )

        with self.subTest("session belongs to logged in user"):
            session = WorkoutSession.objects.first()

            self.assertEqual(
                session.user,
                user,
            )
