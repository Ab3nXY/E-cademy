from django.contrib import admin
from .models import Course, Material, Assessment, Enrollment, Lesson

admin.site.register(Course)
admin.site.register(Material)
admin.site.register(Assessment)
admin.site.register(Enrollment)
admin.site.register(Lesson)