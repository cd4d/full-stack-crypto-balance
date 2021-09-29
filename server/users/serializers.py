from users.models import User
from balances.models import Balance
from rest_framework import serializers
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists, get_username_max_length


class UserSerializer(serializers.ModelSerializer):
    balances = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Balance.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'balances']
