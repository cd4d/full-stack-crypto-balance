from django.shortcuts import render
from users.models import User
from rest_framework import generics, permissions,status
from rest_framework.response import Response
from users.serializers import UserSerializer # UserRegistrationSerializer
# Create your views here.


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class Register(generics.GenericAPIView):
#     serializer_class = UserRegistrationSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#         user = serializer.save()
#         return Response({
#             'user': UserSerializer(user, context=self.get_serializer_context()).data,
#             'message': 'User created successfully.'
#         })
