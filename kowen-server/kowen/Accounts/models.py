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
    email = models.EmailField(_('email address'), unique=True)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)


class Document(models.Model):
    _document = models.TextField(
        blank=True,
        null=True,
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    author = models.ManyToOneRel(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # create 2 methods: set_document and get_document. Set document will take a file and convert it to a string, encode it with base64, hash it with bcrypt and store it in the database. Get document will take the string, decode it with base64, and return the file\

    def set_document(self, document):
        self._document = base64.b64encode(document)

    def get_document(self):
        return base64.b64decode(self._document)

    email = models.TextField(max_length=30, blank=False)
    password = models.TextField(max_length=30, blank=False)
    first_name = models.TextField(max_length=30, blank=False)
    last_name = models.TextField(max_length=30, blank=False)
    roles = models.ManyToManyField(Role, blank=True)

    def __str__(self):
        return self.email
