A full-stack Django React version of the [Angular](https://github.com/cd4d/crypto-balance) single page application showing an editable portfolio of cryptocurrencies with a chart representing the balance and related news. 
Rates and news are fetched from external APIs: [Coingecko](https://www.coingecko.com/en/api) for the rates, RapidAPI [Contextual Web Search](https://rapidapi.com/contextualwebsearch/api/web-search) for the news.
Django backend is used to register users and save their balances.

To accommodate Heroku hosting, the frontend files are served directly from the root directory, hence the React files are in `./src`.

### Stack:
#### React frontend
- React 17.0.2
- React-Redux 7.2
- Redux-toolkit 1.6
- Bootstrap 5.0.2
- PrimeReact 6.4
- Charts.js 3.3
- React Context
- [Coingecko API](https://www.coingecko.com/en/api)
- [RapidAPI Contextual Web Search](https://rapidapi.com/contextualwebsearch/api/web-search)

### Django backend
- Django 3.2
- Django Rest Framework 3.12
- Django Rest Framework Simple JWT
- Psycopg2 2.9
- Django-Cors-headers 3.9

[App on Heroku](https://intense-bayou-22244.onrender.com/). This might take some time to load the Heroku instance.

