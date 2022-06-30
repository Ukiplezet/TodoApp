from tkinter.tix import AUTO
from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=True)
    description = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_created=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(
        auto_created=False, blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title[0:50]
