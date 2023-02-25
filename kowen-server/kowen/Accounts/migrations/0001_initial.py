# Generated by Django 4.1.7 on 2023-02-21 11:37

import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('description', models.TextField(blank=True, max_length=500)),
                ('group_picture', models.ImageField(blank=True, upload_to='group_pictures/')),
                ('group_color', models.CharField(blank=True, max_length=30)),
                ('group_icon', models.CharField(blank=True, max_length=30)),
                ('group_permissions', models.CharField(blank=True, choices=[('can_view', 'can_view'), ('can_edit', 'can_edit'), ('can_delete', 'can_delete'), ('can_create', 'can_create'), ('can_share', 'can_share'), ('can_download', 'can_download'), ('can_upload', 'can_upload')], max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('description', models.TextField(blank=True, max_length=500)),
                ('role_picture', models.ImageField(blank=True, upload_to='role_pictures/')),
                ('role_color', models.CharField(blank=True, max_length=30)),
                ('role_icon', models.CharField(blank=True, max_length=30)),
                ('role_permissions', models.CharField(blank=True, choices=[('can_view', 'can_view'), ('can_edit', 'can_edit'), ('can_delete', 'can_delete'), ('can_create', 'can_create'), ('can_share', 'can_share'), ('can_download', 'can_download'), ('can_upload', 'can_upload')], max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30)),
                ('last_name', models.CharField(blank=True, max_length=30)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('phone_number', models.CharField(blank=True, max_length=17, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')])),
                ('user_picture', models.ImageField(blank=True, upload_to='user_pictures/')),
                ('user_color', models.CharField(blank=True, max_length=30)),
                ('user_icon', models.CharField(blank=True, max_length=30)),
                ('user_permissions', models.CharField(blank=True, max_length=30)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Accounts.group')),
                ('user_role', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Accounts.role')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]