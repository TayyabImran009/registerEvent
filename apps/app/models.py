from django.db import models

# Create your models here.


class RegisterEvents (models.Model):
    title = models.CharField(max_length=2000, null=True, blank=True)
    date = models.CharField(max_length=2000, null=True, blank=True)
    startTime = models.CharField(max_length=2000, null=True, blank=True)
    length = models.CharField(max_length=2000, null=True, blank=True)
    email = models.CharField(max_length=2000, null=True, blank=True)
    location = models.CharField(max_length=2000, null=True, blank=True)
    calender = models.CharField(max_length=2000, null=True, blank=True)
    description = models.CharField(max_length=2000, null=True, blank=True)

    def __str__(self):
        return self.title
