from django.db import models
from users.models import User
# Create your models here.

# list of coins from imported json


class Coin(models.Model):
    # pass
    name = models.TextField(unique=True, blank=True, null=True)
    ticker = models.TextField(unique=True, blank=True, null=True)
    image = models.TextField(blank=True, null=True)
    rateusd = models.DecimalField(decimal_places=2, max_digits=8, default=1)

    class Meta:
        ordering = ['name']
