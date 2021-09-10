from django.db import models
from django.core.validators import MinValueValidator
from django.conf import settings
from users.models import User
from coins.models import Coin
# Create your models here.


class Balance(models.Model):

    id = models.BigAutoField(primary_key=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, null=True,
                              related_name='balances', on_delete=models.CASCADE)
    coin = models.ForeignKey(
        Coin, null=True, related_name='coin', on_delete=models.SET_NULL)
    quantity = models.DecimalField(
        decimal_places=6, max_digits=12, default=0, validators=[MinValueValidator(0)])
    added_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=['owner', 'coin'], name='coinId_ownerId')]

    # # : test it
    # def save(self, *args, **kwargs):
    #     quantity = self.quantity if self.quantity else 0
    #     super(Balance, self).save(*args, **kwargs)
