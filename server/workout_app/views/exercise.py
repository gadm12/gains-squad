from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Exercise, MuscleGroup
from ..serializers import ExerciseSerializer


class Training(APIView):
    permission_classes = [IsAuthenticated]


class ExerciseView(Training):

    def get(self, request):
        exercises = Exercise.objects.all()

        serializer = ExerciseSerializer(
            exercises,
            many=True,
        )

        return Response(serializer.data)

    def post(self, request):
        target_group = request.data.get("target_group")

        if not target_group:
            return Response(
                {"target_group": "This field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        muscle_group, _ = MuscleGroup.objects.get_or_create(
            target_group=target_group
        )

        exercise, created = Exercise.objects.get_or_create(
            external_id=request.data.get("external_id"),
            defaults={
                "exercise_name": request.data.get(
                    "exercise_name"
                ),
                "muscle_group": muscle_group,
            },
        )

        serializer = ExerciseSerializer(exercise)

        return Response(
            serializer.data,
            status=(
                status.HTTP_201_CREATED
                if created
                else status.HTTP_200_OK
            ),
        )
