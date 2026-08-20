from django.urls import path
from .views import (
    OneWorkoutSessionView,
    WorkoutSessionView,
    WorkoutSetView,
    ExerciseView,
)

# @ http://127.0.0.1:8000/api/v1/workout/

urlpatterns = [
    path(
        "sessions/",
        WorkoutSessionView.as_view(),
        name="workout_sessions",
    ),
    path(
        "sessions/<int:id>/",
        OneWorkoutSessionView.as_view(),
        name="a_workout_sessions",
    ),
    path(
        "sessions/<int:id>/sets/",
        WorkoutSetView.as_view(),
        name="workout_sets",
    ),
    path(
        "library/",
        ExerciseView.as_view(),
        name="exercises_library",
    ),
]
