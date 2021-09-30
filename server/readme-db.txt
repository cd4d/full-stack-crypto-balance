for a new installation: 
- remove coins and balances migraitons if any
- create manually crypto_balance db
- run utils/convert_list.py to create and populate coins_coin table
- run makemigrations coins balances users
- run python manage.py migrate