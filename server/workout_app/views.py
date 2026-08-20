from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import WorkoutSession, WorkoutSet, Exercise
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    WorkoutSessionSerializer,
    WorkoutSetSerializer,
    ExerciseSerializer,
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
        workout_set = self.retrieve_set(id, request.user)

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
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExerciseView(Training):

    def get(self, request):
        exercises = Exercise.objects.all()

        serializer = ExerciseSerializer(
            exercises,
            many=True,
        )

        return Response(serializer.data)

    def placeholder():
        """Auth/user app ✅
        Workout models ✅
        Serializers ✅
        Workout session GET/POST ✅
        Single session GET/PUT/DELETE ✅
        Admin setup ✅
        Some Django tests ✅

        WorkoutSet view
        POST /sessions/<id>/sets/✅
        later PUT/PATCH /sets/<id>/
        DELETE /sets/<id>/✅
        Saved Exercise view
        GET /saved-exercises/
        POST /saved-exercises/
        use external_id so you don’t duplicate ExerciseDB exercises.
        Handle MuscleGroup when saving an ExerciseDB exercise.
        find existing group with get_or_create()
        attach it to the saved Exercise.
        Add URLs for those views.
        Write tests for:
        creating a set
        editing a set
        deleting a set
        user cannot modify another user’s set/session
        saving an exercise
        duplicate external_id handling

        Then switch back to React and build the real flow:
        """
        pass
