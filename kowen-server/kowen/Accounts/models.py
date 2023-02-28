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
    password = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    # bio = models.CharField(max_length=30, blank=True)   
    REQUIRED_FIELDS = ["password"]

     
    def __str__(self):
        return self.email


