# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)  # This is already in AbstractUser, but you can keep it if you want it unique.
    first_name = models.CharField(max_length=100, default="Unknown")
    last_name = models.CharField(max_length=100, default="Unknown")

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
