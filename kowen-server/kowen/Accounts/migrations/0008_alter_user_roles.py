# Generated by Django 4.1.7 on 2023-03-18 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0007_alter_user_roles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='roles',
            field=models.ManyToManyField(blank=True, default=1, null=True, to='Accounts.role'),
        ),
    ]