# Generated by Django 3.2.7 on 2021-09-04 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Balance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.DecimalField(decimal_places=6, max_digits=12)),
                ('rateUSD', models.DecimalField(decimal_places=2, max_digits=8)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField()),
            ],
        ),
    ]