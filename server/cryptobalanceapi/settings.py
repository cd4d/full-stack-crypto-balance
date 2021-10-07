"""
Django settings for cryptobalanceapi project.

Generated by 'django-admin startproject' using Django 3.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import django_on_heroku
from pathlib import Path
import os
import dj_database_url
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta
# take environment variables from .env.
dotenv_file = find_dotenv()
if dotenv_file:
    load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-1fs4b#=g5341&0swmd@x3#o24n^%r29n659n8l@2cr&7%%y-4r'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# ALLOWED_HOSTS = ['127.0.0.1', 'api.example.com', 'example.com']
# ALLOWED_HOSTS = ['*']
if dotenv_file:
    ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
    SECRET_KEY = os.getenv('SECRET_KEY')
else:
    ALLOWED_HOSTS = ['https://intense-bayou-22244.herokuapp.com/']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django_extensions',
    # libraries
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'allauth',
    'allauth.account',
    'dj_rest_auth.registration',
    'sslserver',
    'corsheaders',
    # custom
    'users',
    'coins',
    'balances'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'cryptobalanceapi.tokenmiddleware.MoveJWTRefreshCookieIntoTheBody',

]

ROOT_URLCONF = 'cryptobalanceapi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, '/client/build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cryptobalanceapi.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': os.getenv('DB_NAME'),
#         'HOST': os.getenv('DB_HOST'),
#         'PORT': '',
#         'USER': os.getenv('ADMIN_NAME'),
#         'PASSWORD': os.getenv('ADMIN_PASSWORD')
#     }
# }
DATABASES = {}
# uses DATABASE_URL env variable
DATABASES['default'] = dj_database_url.config()

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


AUTH_USER_MODEL = 'users.User'


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        # had to remove rest_framework_simplejwt first and add it back to allow registrations
        'rest_framework_simplejwt.authentication.JWTAuthentication',

    ),

    'EXCEPTION_HANDLER': 'cryptobalanceapi.exceptions.custom_exception_handler',
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],

}


REST_SESSION_LOGIN = False
REST_USE_JWT = True
JWT_AUTH_COOKIE = 'access-token'
JWT_AUTH_REFRESH_COOKIE = 'refresh-token'
JWT_AUTH_SECURE = False
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']
# CORS_ALLOW_ALL_ORIGINS = True
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
}
JWT_AUTH_COOKIE_USE_CSRF = False
CSRF_TRUSTED_ORIGINS = [
    'localhost:3000', '127.0.0.1:3000', 'localhost:8000'
]
REST_AUTH_REGISTER_PERMISSION_CLASSES = (
    'rest_framework.permissions.AllowAny',
)
SITE_ID = 1
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# # Configure Django App for Heroku.
# django_on_heroku.settings(locals())

# # For deployment on heroku
# STATIC_URL = '/static/'

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, '/client/build/static')
# ]

# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
