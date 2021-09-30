from django.shortcuts import render
from users.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from users.serializers import UserSerializer  # UserRegistrationSerializer


# Create your views here.


class UserList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = UserSerializer
    def get_queryset(self):
        try:
            '''
            This view should return the info of the currently authenticated user.
            '''
            queryset = User.objects.all()
            user = self.request.user
            id_in_url = self.kwargs['pk']
            if user is not None and user.id == id_in_url:
                queryset = queryset.filter(id=user.id)
                return queryset
            else:
                return None
        except:
            return None
      


# class Register(RegisterView):
#     serializer_class = RegisterSerializer

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
