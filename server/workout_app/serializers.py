from rest_framework import serializers
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

    exercise_id = serializers.PrimaryKeyRelatedField(
        queryset=Exercise.objects.all(),
        source="exercise",
        write_only=True,
    )

    class Meta:
        model = WorkoutSet
        fields = [
            "id",
            "exercise",
            "exercise_id",
            "set_number",
            "reps",
            "weight",
            "workout_session",
        ]
        read_only_fields = [
            "workout_session",
        ]


class WorkoutSessionSerializer(ModelSerializer):
    sets = WorkoutSetSerializer(
        many=True,
        read_only=True,
    )

    training_volume = serializers.SerializerMethodField()

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

    def get_training_volume(self, obj):
        total = 0

        for workout_set in obj.sets.all():
            total += workout_set.weight * workout_set.reps

        return total
