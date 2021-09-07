from balances.models import Balance
from rest_framework import serializers

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        owner = serializers.ReadOnlyField(source='owner.id')
        fields = ['id','owner','coin','quantity','added_on','updated_on']