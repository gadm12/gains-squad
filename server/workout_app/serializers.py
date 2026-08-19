from rest_framework.serializers import ModelSerializer
from .models import (
    WorkoutSession,
    WorkoutSet,
    Exercise,
    MuscleGroup,
)


class MuscleGroupSerializer(ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = "__all__"


class ExerciseSerializer(ModelSerializer):
    muscle_group = MuscleGroupSerializer(read_only=True)

    class Meta:
        model = Exercise
        fields = "__all__"


class WorkoutSetSerializer(ModelSerializer):
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = WorkoutSet
        fields = "__all__"


class WorkoutSessionSerializer(ModelSerializer):
    sets = WorkoutSetSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = WorkoutSession
        fields = [
            "id",
            "routine",
            "name",
            "date",
            "user",
            "sets",
        ]
        read_only_fields = ["user"]
