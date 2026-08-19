from django.db import models
from datetime import date

# from django.core import validators as val


# Create your models here.
class WorkoutSession(models.Model):
    class Routine(models.TextChoices):
        PUSH = (
            "push",
            "Push",
        )
        PULL = (
            "pull",
            "Pull",
        )
        LEGS = (
            "legs",
            "Legs",
        )
        OTHER = "other", "Other"

    routine = models.CharField(
        max_length=200, choices=Routine.choices
    )
    name = models.CharField(
        max_length=200,
        blank=True,
    )
    date = models.DateField(default=date.today)

    user = models.ForeignKey(
        "user_app.User",
        on_delete=models.CASCADE,
        related_name="workout_sessions",
    )

    def __str__(self):
        return (
            f"{self.routine} | " f"{self.name} | " f"{self.user}"
        )


class MuscleGroup(models.Model):

    target_group = models.CharField(
        max_length=100,
        unique=True,
    )

    def __str__(self):
        return f"{self.target_group}"


class Exercise(models.Model):
    exercise_name = models.CharField(max_length=150)

    external_id = models.CharField(
        max_length=50,
        unique=True,
    )

    muscle_group = models.ForeignKey(
        MuscleGroup,
        on_delete=models.CASCADE,
        related_name="exercises",
    )

    def __str__(self):
        return f"{self.exercise_name} | {self.muscle_group}"


class WorkoutSet(models.Model):
    workout_session = models.ForeignKey(
        WorkoutSession,
        on_delete=models.CASCADE,
        related_name="sets",
    )
    exercise = models.ForeignKey(
        Exercise,
        on_delete=models.CASCADE,
        related_name="workout_sets",
    )
    set_number = models.PositiveIntegerField()
    reps = models.PositiveIntegerField()
    weight = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
    )

    def __str__(self):
        return (
            f"{self.exercise} | "
            f"{self.set_number} | "
            f"{self.reps} | "
            f"{self.weight}"
        )
