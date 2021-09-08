# Generated by Django 3.2.7 on 2021-09-08 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coins', '0013_auto_20210908_2112'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='coin',
            options={'ordering': ['name']},
        ),
        migrations.AddField(
            model_name='coin',
            name='image',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='coin',
            name='name',
            field=models.TextField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='coin',
            name='rateusd',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=8),
        ),
        migrations.AddField(
            model_name='coin',
            name='ticker',
            field=models.TextField(blank=True, null=True, unique=True),
        ),
    ]
