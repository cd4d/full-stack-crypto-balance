from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from balances.models import Balance
from coins.models import Coin
from balances.serializers import BalanceSerializer
from coins.serializers import CoinSerializer
# Create your views here.


class BalanceList(generics.ListCreateAPIView):
    # queryset = Balance.objects.all()
    serializer_class = BalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            '''
            This view should return a list of all the coins
            for the currently authenticated user.
            '''
            queryset = Balance.objects.all()
            user = self.request.user
            if user is not None:
                queryset = queryset.filter(owner=user)
            return queryset
        except:
            return None

    def perform_create(self, serializer):
        newCoin = Coin.objects.all().filter(id=self.request.data['coinID']).first()
        serializer.save(coin=newCoin, owner=self.request.user)


class BalanceDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            queryset = Balance.objects.all()
            user = self.request.user
            if user is not None:
                queryset = queryset.filter(owner=user)
            return queryset
        except:
            return None
