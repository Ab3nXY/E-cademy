from django.urls import path
from .views import CourseListCreate, CourseDetail, MaterialListCreate, MaterialDetail, AssessmentListCreate, AssessmentDetail

urlpatterns = [
    path('courses/', CourseListCreate.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetail.as_view(), name='course-detail'),
    path('materials/', MaterialListCreate.as_view(), name='material-list-create'),
    path('materials/<int:pk>/', MaterialDetail.as_view(), name='material-detail'),
    path('assessments/', AssessmentListCreate.as_view(), name='assessment-list-create'),
    path('assessments/<int:pk>/', AssessmentDetail.as_view(), name='assessment-detail'),
]
