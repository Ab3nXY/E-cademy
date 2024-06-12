from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

class Profile(models.Model):
    USER_ROLES = [
        ('student', 'Student'),
        ('instructor', 'Instructor'),
        ('admin', 'Admin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=USER_ROLES, default='student')
    bio = models.TextField(blank=True, null=True, default='')
    profile_image = models.ImageField(upload_to='profile_images/', default='profile_image/default.jpg', null=True)
    date_of_birth = models.DateField(blank=True, null=True, default='')
    location = models.CharField(max_length=100, blank=True, null=True, default='')
    website = models.URLField(blank=True, null=True, default='')
    social_media_linkedin = models.URLField(blank=True, null=True)
    social_media_twitter = models.URLField(blank=True, null=True)
    interests = models.TextField(blank=True, null=True, default='')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username
