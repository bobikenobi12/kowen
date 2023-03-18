from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
import base64
from datetime import datetime 



class Role(models.Model):
    name = models.CharField(max_length=15, blank=False, unique=True)





class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    last_login = models.DateTimeField(default=datetime.now)
    roles = models.ManyToManyField(Role, null=True, blank=True, default=Role.objects.first().pk)

