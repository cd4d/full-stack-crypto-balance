# Generated by Django 3.2.7 on 2021-09-13 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('balances', '0013_alter_balance_id'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='balance',
            name='coinId_ownerId',
        ),
        migrations.RemoveField(
            model_name='balance',
            name='added_on',
        ),
        migrations.RemoveField(
            model_name='balance',
            name='coin',
        ),
        migrations.RemoveField(
            model_name='balance',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='balance',
            name='quantity',
        ),
        migrations.RemoveField(
            model_name='balance',
            name='updated_on',
        ),
        migrations.AlterField(
            model_name='balance',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
