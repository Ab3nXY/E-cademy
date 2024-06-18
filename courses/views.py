from rest_framework import generics, permissions
from .models import Course, Material, Assessment, Lesson, Enrollment, Progress
from .serializers import (
    CourseSerializer, MaterialSerializer, AssessmentSerializer,
    LessonSerializer, EnrollmentSerializer, ProgressSerializer
)
from rest_framework.response import Response

class CourseListCreate(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class MaterialListCreate(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class MaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class AssessmentListCreate(generics.ListCreateAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer

class AssessmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer

class LessonListCreate(generics.ListCreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class LessonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class EnrollmentListCreate(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if the user is already enrolled in the course
        user = request.user
        course_id = serializer.validated_data['course'].id
        if Enrollment.objects.filter(user=user, course_id=course_id).exists():
            return Response({"detail": "User is already enrolled in this course."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the enrollment
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class EnrollmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

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