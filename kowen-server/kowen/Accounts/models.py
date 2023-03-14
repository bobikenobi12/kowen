from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _



class User(AbstractUser):
    email= models.TextField(max_length=30, blank=False)
    password = models.TextField(max_length=30, blank=False)
    first_name = models.TextField(max_length=30, blank=False)
    last_name = models.TextField(max_length=30, blank=False)
    # roles = models.ManyToManyField(Role, blank=True)


    def __str__(self):
        return self.username


