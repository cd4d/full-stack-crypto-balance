from users.models import User
from balances.models import Balance
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    balances = serializers.PrimaryKeyRelatedField(many=True,queryset=Balance.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'balances']
    
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password','email']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def create(self,validated_data):
        user = User.objects.create_user(validated_data['username'],
        password= validated_data['password'],
        email = validated_data['email'])
        return user
