#!/usr/bin/env bash

# exit on error
set -o errexit

pip install

if [[ $CREATE_SUPERUSER ]];
then
  python server/manage.py createsuperuser --no-input
fi

python server/manage.py collectstatic --no-input
python server/manage.py migrate

