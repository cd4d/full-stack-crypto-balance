from balances.models import Balance
from coins.models import Coin
from rest_framework import serializers
from coins.serializers import CoinSerializer


class BalanceSerializer(serializers.ModelSerializer):
    coinId = serializers.ReadOnlyField(source='coin.id')
    name = serializers.ReadOnlyField(source='coin.name')
    ticker = serializers.ReadOnlyField(source='coin.ticker')
    image = serializers.ReadOnlyField(source='coin.image')
    # coin = CoinSerializer(read_only=True, allow_null=False)
    entryId = serializers.ReadOnlyField(source='id')

    class Meta:
        model = Balance
        owner = serializers.ReadOnlyField(source='owner.id')
        fields = ['entryId', 'owner',
                  'quantity', 'added_on', 'updated_on', 'coinId', 'name', 'ticker', 'image']
