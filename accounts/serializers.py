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
        profile_image = validated_data.pop('profile_image', None)  # Handle profile image separately if needed
        user = instance.user
        
        if profile_image:
            instance.profile_image = profile_image
        
        if user_data:
            user.first_name = user_data.get('first_name', user.first_name)
            user.last_name = user_data.get('last_name', user.last_name)
            user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()


        return instance
