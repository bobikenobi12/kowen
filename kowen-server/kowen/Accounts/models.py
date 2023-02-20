from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group


class Role(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField(max_length=500, blank=True)
    role_picture = models.ImageField(upload_to='role_pictures/', blank=True)
    role_color = models.CharField(max_length=30, blank=True)
    role_icon = models.CharField(max_length=30, blank=True)
    ROLE_PERMISSIONS = (
        ('can_view', 'can_view'),
        ('can_edit', 'can_edit'),
        ('can_delete', 'can_delete'),
        ('can_create', 'can_create'),
        ('can_share', 'can_share'),
        ('can_download', 'can_download'),
        ('can_upload', 'can_upload'),
    )
    role_permissions = models.CharField(
        max_length=30, blank=True, choices=ROLE_PERMISSIONS)

    def __str__(self):
        return self.name


class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    # add a phone number field
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True)  # validators should be a list
    # add a profile picture field
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', blank=True)
    # add a bio field
    bio = models.TextField(max_length=500, blank=True)
    # add a location field
    location = models.CharField(max_length=30, blank=True)
    # add a birth date field
    birth_date = models.DateField(null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class UserGroup(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField(max_length=500, blank=True)
    group_picture = models.ImageField(upload_to='group_pictures/', blank=True)
    group_color = models.CharField(max_length=30, blank=True)
    group_icon = models.CharField(max_length=30, blank=True)
    group_members = models.ManyToManyField(User, through='Membership')
    group_owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='group_owner')
    group_admins = models.ManyToManyField(User, through='Adminship')
    group_roles = models.ManyToManyField(Role, through='GroupRole')
    group_permissions = models.ManyToManyField(
        'GroupPermission', through='GroupPermissionRole')

    def __str__(self):
        return self.name
