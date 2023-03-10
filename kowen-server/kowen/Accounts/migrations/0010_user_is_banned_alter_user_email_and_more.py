# Generated by Django 4.1.7 on 2023-03-03 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0009_remove_role_role_color_remove_role_role_icon_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_banned',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.TextField(max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.TextField(max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.TextField(max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.TimeField(max_length=30),
        ),
    ]
