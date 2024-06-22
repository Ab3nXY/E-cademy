from rest_framework import serializers
from .models import Course, Material, Assessment, Lesson, Enrollment, Progress

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'course']  # Ensure user is not included here

    def create(self, validated_data):
        # Assign the user from the request
        request = self.context.get('request')
        user = request.user
        course = validated_data.get('course')

        # Create and return the new Enrollment instance
        enrollment = Enrollment.objects.create(user=user, course=course)
        return enrollment

class CourseSerializer(serializers.ModelSerializer):
    materials = MaterialSerializer(many=True, read_only=True)
    assessments = AssessmentSerializer(many=True, read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)
    enrollments = EnrollmentSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = '__all__'