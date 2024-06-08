from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone

class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    duration = models.PositiveIntegerField(help_text="Duration in minutes", default=0)
    category = models.CharField(max_length=50, default='')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='Beginner')
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)

class Material(models.Model):
    course = models.ForeignKey(Course, related_name='materials', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    file = models.FileField(upload_to='course_materials/', null=True, blank=True)

    def __str__(self):
        return self.title

class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    order = models.PositiveIntegerField(help_text="Order of the lesson within the course")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']

class Assessment(models.Model):
    course = models.ForeignKey(Course, related_name='assessments', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    question = models.TextField()
    answer = models.CharField(max_length=100)
    option_1 = models.CharField(max_length=100, default='Default option 1')
    option_2 = models.CharField(max_length=100, default='Default option 2')
    option_3 = models.CharField(max_length=100, default='Default option 3')
    option_4 = models.CharField(max_length=100, default='Default option 4')

    def __str__(self):
        return self.title

class Enrollment(models.Model):
    user = models.ForeignKey(User, related_name='enrollments', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='enrollments', on_delete=models.CASCADE)
    date_enrolled = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'course']  # Ensure each user can enroll in a course only once

    def __str__(self):
        return f'{self.user.username} enrolled in {self.course.title}'

class Progress(models.Model):
    user = models.ForeignKey(User, related_name='progress', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='progress', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    progress_percentage = models.IntegerField(default=0, help_text="Progress percentage (0-100)")

    class Meta:
        unique_together = ['user', 'course']  # Each user can have only one progress per course

    def __str__(self):
        return f'{self.user.username}\'s progress in {self.course.title}'