from django.contrib import admin
from django.urls import path, include
from accounts import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/', include('courses.urls')),
    path('login/', views.login, name='login'),
    path('authenticate-jwt/', views.authenticate_jwt, name='authenticate-jwt'),
]
