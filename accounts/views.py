from django.http import JsonResponse
from e_cademy.utils.jwt_utils import  decode_jwt_token
from django.contrib.auth.models import User
from django.shortcuts import render
from accounts.decorators import role_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView

class CurrentUserProfileView(RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        user_data = mutable_data.pop('user', None)
        profile_image = request.FILES.get('profile_image', None)
        
        instance = self.get_object()
        partial = kwargs.pop('partial', False)
        profile_serializer = self.get_serializer(instance, data=mutable_data, partial=partial)
        
        profile_serializer.is_valid(raise_exception=True)
        
        if profile_image:
            profile_serializer.validated_data['profile_image'] = profile_image
        
        profile_serializer.save()

        if user_data:
            user = instance.user
            user_serializer = ProfileSerializer(user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        return Response(profile_serializer.data)

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
