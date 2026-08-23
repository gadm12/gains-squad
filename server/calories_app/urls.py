from django.urls import path
from .views import CaloriesBurnedCalculator

# @ http://127.0.0.1:8000/api/v1/calories/

urlpatterns = [
    path(
        "<int:weight>/<int:duration>/",
        CaloriesBurnedCalculator.as_view(),
        name="calories_burned",
    )
]
