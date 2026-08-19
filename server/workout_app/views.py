from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from .models import (
    WorkoutSession,
    WorkoutSet,
    Exercise,
    MuscleGroup,
)
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    WorkoutSetSerializer,
    WorkoutSessionSerializer,
    ExerciseSerializer,
    MuscleGroupSerializer,
)


class Training(APIView):
    permission_classes = [IsAuthenticated]


class WorkoutSessionView(Training):

    def get(self, request):
        sessions = WorkoutSession.objects.filter(
            user=request.user
        )

        serializer = WorkoutSessionSerializer(
            sessions, many=True
        )

        return Response(serializer.data)
    

    def post(self, request):
        serializer = WorkoutSessionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
