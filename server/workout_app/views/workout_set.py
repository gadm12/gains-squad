from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import WorkoutSession, WorkoutSet
from ..serializers import WorkoutSetSerializer


class Training(APIView):
    permission_classes = [IsAuthenticated]


class WorkoutSetView(Training):

    def retrieve_set(self, id, user):
        return get_object_or_404(
            WorkoutSet,
            id=id,
            workout_session__user=user,
        )

    def post(self, request, session_id):
        session = get_object_or_404(
            WorkoutSession,
            id=session_id,
            user=request.user,
        )

        serializer = WorkoutSetSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(workout_session=session)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def put(self, request, id):
        workout_set = self.retrieve_set(
            id,
            request.user,
        )
        serializer = WorkoutSetSerializer(
            workout_set,
            data=request.data,
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, id):
        workout_set = self.retrieve_set(
            id,
            request.user,
        )

        serializer = WorkoutSetSerializer(
            workout_set,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, id):
        workout_set = self.retrieve_set(
            id,
            request.user,
        )

        workout_set.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )
