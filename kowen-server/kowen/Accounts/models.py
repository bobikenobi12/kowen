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


class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(UserGroup, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(default=timezone.now)
    invited_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='invited_by')
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class Adminship(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(UserGroup, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.user.username


class GroupRole(models.Model):
    group = models.ForeignKey(UserGroup, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.role.name


class GroupPermission(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField(max_length=500, blank=True)
    group_permission_picture = models.ImageField(
        upload_to='group_permission_pictures/', blank=True)
    group_permission_color = models.CharField(max_length=30, blank=True)
    group_permission_icon = models.CharField(max_length=30, blank=True)
    GROUP_PERMISSIONS = (
        ('can_view', 'can_view'),
        ('can_edit', 'can_edit'),
        ('can_delete', 'can_delete'),
        ('can_create', 'can_create'),
        ('can_share', 'can_share'),
        ('can_download', 'can_download'),
        ('can_upload', 'can_upload'),
    )
    group_permission = models.CharField(
        max_length=30, blank=True, choices=GROUP_PERMISSIONS)

    def __str__(self):
        return self.name


class GroupPermissionRole(models.Model):
    group = models.ForeignKey(UserGroup, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    group_permission = models.ForeignKey(
        GroupPermission, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.group_permission.name


class GroupPermissionUser(models.Model):
    group = models.ForeignKey(UserGroup, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group_permission = models.ForeignKey(
        GroupPermission, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.group_permission.name

# 1. User model - this model is used to create a user
# 2. Role model - this model is used to create a role
# 3. UserGroup model - this model is used to create a group
# 4. Membership model - this model is used to create a membership
# 5. Adminship model - this model is used to create an adminship for a user in a group. What does this mean? It means that a user can be an admin in a group
# 6. GroupRole model - this model is used to create a group role. What does this mean? It means that a group can have a role
# 7. GroupPermission model - this model is used to create a group permission. What does this mean? It means that a group can have a permission. a group needs to have many permissions, not just one
# 8. GroupPermissionRole model - this model is used to create a group permission role. What does this mean? It means that a group permission can have a role
# 9. GroupPermissionUser model - this model is used to create a group permission user. What does this mean? It means that a group permission can have a user
