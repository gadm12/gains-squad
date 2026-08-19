from django.urls import path
from .views import WorkoutSessionView

#! http://127.0.0.1:8000/api/v1/workout/

urlpatterns = [
    path(
        "sessions/",
        WorkoutSessionView.as_view(),
        name="workout_sessions",
    )
]
