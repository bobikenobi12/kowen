from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group

# Models for the Accounts app of the Kowen project
# The Accounts app is responsible for the user management of the Kowen project
# The Kowen project is a Django project that is used as a document management system
# It is supposed to manage the documents of a company or an organization
# There is a hierarchy of users in a particular organization
# There are a set of default roles that are created when the project is initialized
# The default roles are: Admin, Manager, Editor, Viewer
# The Admin role has the highest privileges and the Viewer role has the lowest privileges
# The Admin role can create, edit, delete, share, download, upload, view all the documents
# The Manager role can create, edit, delete, share, download, upload, view all the documents
# The Editor role can create, edit, delete, share, download, upload, view all the documents
# The Viewer role can view all the documents
# There is a set of default groups that are created when the project is initialized
# The default groups are: Admin, Manager, Editor, Viewer
# The Admin group has the highest privileges and the Viewer group has the lowest privileges
# The Admin group can create, edit, delete, share, download, upload, view all the documents
# The Manager group can create, edit, delete, share, download, upload, view all the documents
# The Editor group can create, edit, delete, share, download, upload, view all the documents
# The Viewer group can view all the documents
# There is a set of default permissions that are created when the project is initialized
# The default permissions are: can_view, can_edit, can_delete, can_create, can_share, can_download, can_upload
# Custom roles can be created by the Admin role with a set of permissions
# Custom groups can be created by the Admin role
# Some documents can be shared with a particular role, a particular group, or a particular user


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


class Group(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField(max_length=500, blank=True)
    group_picture = models.ImageField(upload_to='group_pictures/', blank=True)
    group_color = models.CharField(max_length=30, blank=True)
    group_icon = models.CharField(max_length=30, blank=True)
    GROUP_PERMISSIONS = (
        ('can_view', 'can_view'),
        ('can_edit', 'can_edit'),
        ('can_delete', 'can_delete'),
        ('can_create', 'can_create'),
        ('can_share', 'can_share'),
        ('can_download', 'can_download'),
        ('can_upload', 'can_upload'),
    )
    group_permissions = models.CharField(
        max_length=30, blank=True, choices=GROUP_PERMISSIONS)

    def __str__(self):
        return self.name


class User(AbstractUser):
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(_('email address'), unique=True)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True)  # validators should be a list
    user_picture = models.ImageField(upload_to='user_pictures/', blank=True)
    user_color = models.CharField(max_length=30, blank=True)
    user_icon = models.CharField(max_length=30, blank=True)
    user_role = models.ForeignKey(
        Role, on_delete=models.CASCADE, blank=True, null=True)
    user_group = models.ForeignKey(
        Group, on_delete=models.CASCADE, blank=True, null=True)
    user_permissions = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username
