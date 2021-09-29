for a new installation: 
- remove coins and balances migraitons if any
- create manually crypto_balance db
- create manually balances_balance table
- run utils/convert_list.py to create and populate coins_coin table
- run python manage.py migrate