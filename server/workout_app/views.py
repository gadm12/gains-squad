from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import WorkoutSession
from rest_framework.permissions import IsAuthenticated
from .serializers import WorkoutSessionSerializer


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


class OneWorkoutSessionView(Training):

    def retrieve_session(self, id, user):

        return get_object_or_404(
            WorkoutSession, id=id, user=user
        )

    def get(self, request, id):
        session = self.retrieve_session(id, request.user)
        serializer = WorkoutSessionSerializer(session)
        return Response(serializer.data)

    def delete(self, request, id):
        session = self.retrieve_session(id, request.user)
        session.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id):
        session = self.retrieve_session(id, request.user)
        serializer = WorkoutSessionSerializer(
            session, data=request.data
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
