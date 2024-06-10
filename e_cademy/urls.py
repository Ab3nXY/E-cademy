from django.contrib import admin
from django.urls import path, include
from accounts import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),
    path('api/', include('courses.urls')),
    path('authenticate-jwt/', views.authenticate_jwt, name='authenticate-jwt'),
    path('get_csrf_token/', views.get_csrf_token, name='get_csrf_token'),
    path('status/', views.check_auth_status, name='auth_status'),
]
