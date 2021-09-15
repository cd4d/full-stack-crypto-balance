from balances.models import Balance
from rest_framework import serializers
from coins.serializers import CoinSerializer


class BalanceSerializer(serializers.ModelSerializer):
    # name = serializers.ReadOnlyField(source='coin.name')
    coin = CoinSerializer(read_only=True)

    class Meta:
        model = Balance
        owner = serializers.ReadOnlyField(source='owner.id')
        fields = ['id', 'owner',
                  'quantity', 'added_on', 'updated_on', 'coin']

    def create(self, validated_data):
        
        balance = Balance.objects.create( **validated_data)
        return balance
