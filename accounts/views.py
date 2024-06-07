from django.contrib.auth import authenticate
from django.http import JsonResponse
from e_cademy.utils.jwt_utils import create_jwt_token, decode_jwt_token

def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token = create_jwt_token(user.id)
        return JsonResponse({'token': token.decode('utf-8')})
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

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
