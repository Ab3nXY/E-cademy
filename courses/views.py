from rest_framework import generics, permissions, status
from .models import Course, Material, Assessment, Lesson, Enrollment, Progress, SubLesson
from .serializers import (
    CourseSerializer, MaterialSerializer, AssessmentSerializer,
    LessonSerializer, EnrollmentSerializer, ProgressSerializer, SubLessonSerializer
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

class CourseListCreate(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
class MaterialListCreate(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class MaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class AssessmentListCreate(generics.ListCreateAPIView):
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        lesson_id = self.kwargs.get('lesson_id')
        if lesson_id:
            return Assessment.objects.filter(lesson_id=lesson_id)
        return Assessment.objects.filter(course_id=course_id, lesson__isnull=True)

    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_id')
        lesson_id = self.kwargs.get('lesson_id')
        serializer.save(course_id=course_id, lesson_id=lesson_id)

class AssessmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LessonListCreate(generics.ListCreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH', 'POST']:
            return LessonSerializer  
        else:
            return LessonSerializer  

class EnrollmentListCreate(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]  # Ensure user is authenticated

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if the user is already enrolled in the course
        user = request.user
        course_id = serializer.validated_data['course'].id
        if Enrollment.objects.filter(user=user, course_id=course_id).exists():
            return Response({"detail": "User is already enrolled in this course."}, status=status.HTTP_400_BAD_REQUEST)
        print('course_id', course_id)
        print('user', user)
        # Create the enrollment
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class UnenrollAPIView(generics.DestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        course_id = request.data.get('course')
        try:
            enrollment = Enrollment.objects.get(user=user, course_id=course_id)
            enrollment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Enrollment.DoesNotExist:
            return Response({"detail": "Enrollment does not exist."}, status=status.HTTP_400_BAD_REQUEST)

class EnrollmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

class ProgressListCreate(generics.ListCreateAPIView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if the progress entry already exists
        user = request.user
        course_id = serializer.validated_data['course'].id
        if Progress.objects.filter(user=user, course_id=course_id).exists():
            return Response({"detail": "Progress entry already exists for this course."}, status=status.HTTP_400_BAD_REQUEST)
        # Create the progress entry
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProgressDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Check if the progress update marks the course as completed
        if 'completed' in serializer.validated_data and serializer.validated_data['completed']:
            serializer.validated_data['progress_percentage'] = 100

        self.perform_update(serializer)

        return Response(serializer.data)

class CourseProgress(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        # Get or create progress for the user in this course
        progress, created = Progress.objects.get_or_create(user=user, course=instance)

        serializer = self.get_serializer(instance)
        course_data = serializer.data
        course_data['progress'] = ProgressSerializer(progress).data

        return Response(course_data)

class CourseEnrollmentList(generics.ListAPIView):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        course_id = self.kwargs['pk']
        return Enrollment.objects.filter(course_id=course_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class EnrolledCoursesList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        enrolled_course_ids = Enrollment.objects.filter(user=user).values_list('course', flat=True)
        return Course.objects.filter(id__in=enrolled_course_ids)
    
class LessonListByCourse(generics.ListCreateAPIView):
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Lesson.objects.filter(course__id=course_id)

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        course = get_object_or_404(Course, id=course_id)
        serializer.save(course=course)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return LessonSerializer  # Use LessonSerializer for creating lessons
        else:
            return LessonSerializer  # Use LessonSerializer for listing lessons

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MaterialListByCourse(generics.ListCreateAPIView):
    serializer_class = MaterialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Material.objects.filter(course__id=course_id)

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        course = get_object_or_404(Course, id=course_id)
        serializer.save(course=course)
    
