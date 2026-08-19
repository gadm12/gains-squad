from django.contrib import admin
from .models import (
    WorkoutSession,
    MuscleGroup,
    Exercise,
    WorkoutSet,
)

admin.site.register(
    [WorkoutSession, MuscleGroup, Exercise, WorkoutSet]
)
