from balances.models import Balance
from rest_framework import serializers
from coins.serializers import CoinSerializer


class BalanceSerializer(serializers.ModelSerializer):
    # name = serializers.ReadOnlyField(source='coin.name')
    coin = CoinSerializer(many=True, read_only=True)
    class Meta:
        model = Balance
        owner = serializers.ReadOnlyField(source='owner.id')
        fields = ['id', 'owner', 'coin', 
                  'quantity', 'added_on', 'updated_on']
