from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    USER_ROLES = [
        ('student', 'Student'),
        ('instructor', 'Instructor'),
        ('admin', 'Admin'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=USER_ROLES, default='student')

    def __str__(self):
        return self.user.username
