from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        user = instance.user

        # Update the user fields if user data is provided
        if user_data:
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()

        # Update the profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
