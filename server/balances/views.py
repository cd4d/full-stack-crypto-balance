from rest_framework import generics, permissions, status
from rest_framework.response import Response
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
        try:
            newCoin = Coin.objects.all().filter(id=self.request.data['coinID']).first()
            if not newCoin:
                raise ValueError('coin id is invalid')
                return None
            else:
                serializer.save(coin=newCoin, owner=self.request.user)
        except Exception as err:
            print(err)
            return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)


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
