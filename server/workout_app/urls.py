from django.urls import path
from .views.workout_session import (
    WorkoutSessionView,
    OneWorkoutSessionView,
)

from .views.workout_set import WorkoutSetView
from .views.exercise import ExerciseView

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
        "sets/<int:id>/",
        WorkoutSetView.as_view(),
        name="workout_set",
    ),
    path(
        "sessions/<int:session_id>/sets/",
        WorkoutSetView.as_view(),
        name="workout_sets",
    ),
    path(
        "library/",
        ExerciseView.as_view(),
        name="exercises_library",
    ),
]
