from django.contrib import admin

from .models import (
    WorkoutSession,
    MuscleGroup,
    Exercise,
    WorkoutSet,
)


class WorkoutSetInline(admin.TabularInline):
    model = WorkoutSet
    extra = 1


@admin.register(WorkoutSession)
class WorkoutSessionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "routine",
        "name",
        "date",
        "user",
    )
    inlines = [WorkoutSetInline]


@admin.register(WorkoutSet)
class WorkoutSetAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "exercise",
        "set_number",
        "reps",
        "weight",
    )


admin.site.register(MuscleGroup)
admin.site.register(Exercise)
