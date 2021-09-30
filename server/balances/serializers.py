from balances.models import Balance
from coins.models import Coin
from rest_framework import serializers
from coins.serializers import CoinSerializer


class BalanceSerializer(serializers.ModelSerializer):
    coinId = serializers.ReadOnlyField(source='coin.id')
    name = serializers.ReadOnlyField(source='coin.name')
    slug = serializers.ReadOnlyField(source='coin.slug')
    ticker = serializers.ReadOnlyField(source='coin.ticker')
    image = serializers.ReadOnlyField(source='coin.image')
    entryId = serializers.ReadOnlyField(source='id')
    # coin = CoinSerializer(read_only=True, allow_null=False)

    class Meta:
        model = Balance
        owner = serializers.ReadOnlyField(source='owner.id')
        fields = ['entryId', 'owner',
                  'quantity', 'coinId', 'name', 'slug', 'ticker', 'image']
