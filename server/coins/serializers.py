from rest_framework import serializers
from coins.models import Coin


class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ['id','name','ticker','image','rateusd']

    

# class CoinSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(allow_blank=True, allow_null=True)
#     ticker = serializers.CharField(allow_blank=True, allow_null=True)
#     image = serializers.CharField(allow_blank=True, allow_null=True)
#     rateUSD = serializers.DecimalField(
#         decimal_places=2, max_digits=8, default=1)

#     def create(self, validated_data):
#         return Coin.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     """
    #     Update and return an existing `Coin` instance, given the validated data.
    #     """
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.ticker = validated_data.get('ticker', instance.ticker)
    #     instance.image = validated_data.get('image', instance.image)
    #     instance.rateUSD = validated_data.get('rateUSD', instance.rateUSD)
    #     instance.save()
    #     return instance
