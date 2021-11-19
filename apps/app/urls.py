# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.conf.urls import url
from django.urls import path, re_path, include
from apps.app import views

urlpatterns = [
    path('test/', views.test, name='test'),
    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

    path('Event/', views.storEvent, name="Event"),
]
