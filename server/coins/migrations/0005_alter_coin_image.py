# Generated by Django 3.2.7 on 2021-09-05 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coins', '0004_auto_20210905_1959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coin',
            name='image',
            field=models.TextField(blank=True, null=True),
        ),
    ]