from django.urls import path
from .views import WorkoutSessionView

# api/v1/workout/

urlpatterns = [
    path(
        "sessions/",
        WorkoutSessionView.as_view(),
        name="workout-sessions",
    )
]
