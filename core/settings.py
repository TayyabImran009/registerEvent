# -*- encoding: UTF-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import os
from decouple import config
from unipath import Path
import environ
from apps.app.variables import *


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = Path(__file__).parent
CORE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='S#perS3crEt_1122')
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

# load production server from .env
ALLOWED_HOSTS = ['localhost', '127.0.0.1', config('SERVER', default='127.0.0.1'), 'business-dashboard-21.herokuapp.com',
                 'biz-dashboard-21.herokuapp.com', '5d2e-148-67-45-133.ngrok.io']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'apps.app',
    'social_django'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

INTERNAL_IPS = [
    # ...
    '127.0.0.1',
    # ...
]

ROOT_URLCONF = 'core.urls'
# LOGIN_REDIRECT_URL = "google_auth"  # Route defined in app/urls.py
# LOGOUT_REDIRECT_URL = "home"  # Route defined in app/urls.py
TEMPLATE_DIR = os.path.join(
    CORE_DIR, "core/templates")  # ROOT dir for templates
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/login"

# Local
if os.getcwd() == '/Users/elisaaoki/lysa':
    env = environ.Env()
    environ.Env.read_env()

    NEWS_TOKEN = env('NEWS_TOKEN')
    WEATHER_TOKEN = env('WEATHER_TOKEN')
    MAPS_TOKEN = env('MAPS_TOKEN')
    GOOGLE_MAPS_TOKEN = env('GOOGLE_MAPS_TOKEN')
    ZOOM_CLIENT_ID = env('ZOOM_CLIENT_ID')
    ZOOM_CLIENT_SECRET = env('ZOOM_CLIENT_SECRET')
    SLACK_CLIENT_ID = env('SLACK_CLIENT_ID')
    SLACK_CLIENT_SECRET = env('SLACK_CLIENT_SECRET')
    db_user = env('db_user')
    db_pw = env('db_pw')
    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env('SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')

    ZOOM_REDIRECT_URI = 'https://5d2e-148-67-45-133.ngrok.io/zoom_auth'
    SLACK_REDIRECT_URI = 'https://5d2e-148-67-45-133.ngrok.io/slack/oauth/'

# Server
else:
    NEWS_TOKEN = os.environ.get('NEWS_TOKEN')
    WEATHER_TOKEN = os.environ.get('WEATHER_TOKEN')
    MAPS_TOKEN = os.environ.get('MAPS_TOKEN')
    GOOGLE_MAPS_TOKEN = os.environ.get('GOOGLE_MAPS_TOKEN')
    ZOOM_CLIENT_ID = os.environ.get('ZOOM_CLIENT_ID')
    ZOOM_CLIENT_SECRET = os.environ.get('ZOOM_CLIENT_SECRET')
    SLACK_CLIENT_ID = os.environ.get('SLACK_CLIENT_ID')
    SLACK_CLIENT_SECRET = os.environ.get('SLACK_CLIENT_SECRET')
    db_user = os.environ.get('db_user')
    db_pw = os.environ.get('db_pw')
    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.environ.get(
        'SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.environ.get(
        'SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')

    ZOOM_REDIRECT_URI = 'https://business-dashboard-21.herokuapp.com/zoom_auth'
    SLACK_REDIRECT_URI = 'https://business-dashboard-21.herokuapp.com/slack/oauth/'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = (
    'social_core.backends.open_id.OpenIdAuth',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.google.GoogleOAuth',
    'django.contrib.auth.backends.ModelBackend',
)

WSGI_APPLICATION = 'core.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
#
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#         }
#     },
#     'loggers': {
#         'django.db.backends': {
#             'level': 'DEBUG',
#             'handlers': ['console'],
#         },
#     }
# }

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

# LANGUAGE_CODE = 'ja-JP'
LANGUAGE_CODE = 'en-US'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True

#############################################################
# SRC: https://devcenter.heroku.com/articles/django-assets

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
STATIC_ROOT = os.path.join(CORE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(CORE_DIR, 'core/static'),
)
#############################################################
#############################################################


# Google Oauth settings
SOCIAL_AUTH_GOOGLE_OAUTH_SCOPE = ['username', 'first_name', 'last_name']
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['https://www.googleapis.com/auth/calendar']
SOCIAL_AUTH_GOOGLE_OAUTH2_AUTH_EXTRA_ARGUMENTS = {'access_type': 'offline',
                                                  'approval_prompt': 'force'}
