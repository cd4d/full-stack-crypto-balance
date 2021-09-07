from rest_framework import generics
from balances.models import Balance
from balances.serializers import BalanceSerializer
from rest_framework import permissions
# Create your views here.

class BalanceList(generics.ListCreateAPIView):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class BalanceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryst = Balance.objects.all()
    serializer_class = BalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

