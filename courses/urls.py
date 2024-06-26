from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('courses/', views.CourseListCreate.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', views.CourseDetail.as_view(), name='course-detail'),
    path('courses/<int:course_id>/lessons/', views.LessonListByCourse.as_view(), name='lesson-list-by-course'),
    path('courses/<int:course_id>/materials/', views.MaterialListByCourse.as_view(), name='material-list-by-course'),
    path('lessons/', views.LessonListCreate.as_view(), name='lesson-list-create'),
    path('courses/<int:course_id>/lessons/<int:pk>/', views.LessonDetail.as_view(), name='lesson-detail'),
    path('materials/', views.MaterialListCreate.as_view(), name='material-list-create'),
    path('materials/<int:pk>/', views.MaterialDetail.as_view(), name='material-detail'),
    path('courses/<int:course_id>/lessons/<int:lesson_id>/assessments/', views.AssessmentListCreate.as_view(), name='course-assessment-list-create'),
    path('courses/<int:course_id>/lessons/<int:lesson_id>/assessments/', views.AssessmentListCreate.as_view(), name='lesson-assessment-list-create'),
    path('courses/<int:course_id>/lessons/<int:lesson_id>/assessments/submit/', views.SubmitAssessmentView.as_view(), name='submit-assessment'),
    path('assessments/<int:pk>/', views.AssessmentDetail.as_view(), name='assessment-detail'),
    path('enrollments/', views.EnrollmentListCreate.as_view(), name='enrollment-list-create'),
    path('unenroll/', views.UnenrollAPIView.as_view(), name='unenroll'),
    path('enrollments/<int:pk>/', views.EnrollmentDetail.as_view(), name='enrollment-detail'),
    path('progress/', views.ProgressListCreate.as_view(), name='progress-list-create'),
    path('progress/<int:pk>/', views.ProgressDetail.as_view(), name='progress-detail'),
    path('courses/<int:pk>/progress/', views.CourseProgress.as_view(), name='course-progress'),
    path('courses/<int:pk>/enrollments/', views.CourseEnrollmentList.as_view(), name='course-enrollment-list'),
    path('enrolled-courses/', views.EnrolledCoursesList.as_view(), name='enrolled-courses-list'),
]
