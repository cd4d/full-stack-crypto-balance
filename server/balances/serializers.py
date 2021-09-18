from balances.models import Balance
from coins.models import Coin
from rest_framework import serializers
from coins.serializers import CoinSerializer


class BalanceSerializer(serializers.ModelSerializer):
    # name = serializers.ReadOnlyField(source='coin.name')
    coin = CoinSerializer(read_only=True, allow_null=False)

    class Meta:
        model = Balance
        owner = serializers.ReadOnlyField(source='owner.id')
        fields = ['id', 'owner',
                  'quantity', 'added_on', 'updated_on', 'coin']
