from django.contrib import admin
from .models import Course, Material, Assessment, Enrollment, Lesson, SubLesson

admin.site.register(Course)
admin.site.register(Material)
admin.site.register(Assessment)
admin.site.register(Enrollment)

class SubLessonInline(admin.StackedInline):
    model = SubLesson
    extra = 1  # Number of empty sub-lesson forms to display

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    inlines = [SubLessonInline]

admin.site.register(SubLesson)