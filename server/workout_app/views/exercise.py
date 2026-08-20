from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Exercise
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
