import os
import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache
from rest_framework.permissions import IsAuthenticated
from rich import print

CACHE_TTL = 60 * 60 * 24


class Burned(APIView):
    permission_classes = [IsAuthenticated]


class CaloriesBurnedCalculator(Burned):

    def get(self, request, weight, duration):

        api_key = os.getenv("NINJA_API_KEY")

        if not api_key:
            return Response(
                {"error": "Ninja API key is missing."},
                status=500,
            )

        endpoint = (
            f"https://api.api-ninjas.com/v1/caloriesburned"
        )

        cache_key = f"calories_burned:{weight}:{duration}"

        cached_data = cache.get(cache_key)

        if cached_data is not None:
            print("CACHE HIT")
            return Response(cached_data)

        print("CACHE MISS")

        try:
            response = requests.get(
                endpoint,
                params={
                    "activity": "weight lifting",
                    "weight": weight,
                    "duration": duration,
                },
                headers={"X-Api-Key": api_key},
                timeout=10,
            )

            response.raise_for_status()

        except requests.RequestException:
            return Response(
                {
                    "error": "Ninja API service is temporarily unavailable."
                },
                status=503,
            )

        ninja_data = response.json()

        results = []

        for item in ninja_data:

            results.append(
                {
                    "name": item.get("name"),
                    "calories_per_hour": item.get(
                        "calories_per_hour"
                    ),
                    "duration_minutes": item.get(
                        "duration_minutes"
                    ),
                    "total_calories": item.get("total_calories"),
                }
            )

        data = {
            "count": len(results),
            "results": results,
        }
        cache.set(cache_key, data, timeout=CACHE_TTL)
        print(data)
        return Response(data)
