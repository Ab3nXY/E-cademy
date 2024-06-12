from django.http import JsonResponse
from e_cademy.utils.jwt_utils import  decode_jwt_token
from django.contrib.auth.models import User
from django.shortcuts import render
from accounts.decorators import role_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class ProfileUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)

class CurrentUserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = user.profile  
        serialized_data = ProfileSerializer(profile).data
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        serialized_data.update(user_data)
        return Response(serialized_data)

@csrf_exempt
def check_auth_status(request):
    if request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': True})
    else:
        return JsonResponse({'isAuthenticated': False})

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrftoken': request.COOKIES['csrftoken']})

def authenticate_jwt(request):
    token = request.POST.get('token')

    if token:
        payload = decode_jwt_token(token)
        if payload:
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
            return JsonResponse({'user': user.username})
        else:
            return JsonResponse({'error': 'Invalid token'}, status=400)
    else:
        return JsonResponse({'error': 'Token not provided'}, status=400)

@role_required('instructor')
def instructor_dashboard(request):
    return render(request, 'instructor_dashboard.html')

@role_required('student')
def student_dashboard(request):
    return render(request, 'student_dashboard.html')

@role_required('admin')
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')
