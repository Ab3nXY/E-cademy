from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('courses/', views.CourseListCreate.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', views.CourseDetail.as_view(), name='course-detail'),
    path('materials/', views.MaterialListCreate.as_view(), name='material-list-create'),
    path('materials/<int:pk>/', views.MaterialDetail.as_view(), name='material-detail'),
    path('assessments/', views.AssessmentListCreate.as_view(), name='assessment-list-create'),
    path('assessments/<int:pk>/', views.AssessmentDetail.as_view(), name='assessment-detail'),
    path('lessons/', views.LessonListCreate.as_view(), name='lesson-list-create'),
    path('lessons/<int:pk>/', views.LessonDetail.as_view(), name='lesson-detail'),
    path('enrollments/', views.EnrollmentListCreate.as_view(), name='enrollment-list-create'),
    path('enrollments/<int:pk>/', views.EnrollmentDetail.as_view(), name='enrollment-detail'),
    path('progress/', views.ProgressListCreate.as_view(), name='progress-list-create'),
    path('progress/<int:pk>/', views.ProgressDetail.as_view(), name='progress-detail'),
    path('courses/<int:pk>/progress/', views.CourseProgress.as_view(), name='course-progress'),
    path('courses/<int:pk>/enrollments/', views.CourseEnrollmentList.as_view(), name='course-enrollment-list'),
    path('enrolled-courses/', views.EnrolledCoursesList.as_view(), name='enrolled-courses-list'),
]
