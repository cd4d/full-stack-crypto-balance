from rest_framework import generics
from balances.models import Balance
from balances.serializers import BalanceSerializer
from rest_framework import permissions
# Create your views here.


class BalanceList(generics.ListCreateAPIView):
    # queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the coins
        for the currently authenticated user.
        """
        user = self.request.user
        return Balance.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BalanceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
    permission_classes = [permissions.IsAuthenticated]
