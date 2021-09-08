from dotenv import load_dotenv
import os
import json
import psycopg2
load_dotenv()


connection = None


def connect():
    try:
        with open('coins-list-sorted.json') as f:
            json_data = json.load(f)
        connection = psycopg2.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('ADMIN_NAME'),
            host=os.getenv('DB_HOST'),
            password=os.getenv('ADMIN_PASSWORD')
        )

        cursor = connection.cursor()
        cursor.execute("""SELECT VERSION()""")
        row = cursor.fetchone()
        print("Connected.\nServer version is ", row)

        cursor.execute(
            "CREATE TABLE IF NOT EXISTS coins_coin (name text,ticker text,rateusd numeric(8,2),image text)"
        )

        # Table coins_coin already exists. The fields in json file are: symbol (will be ticker), id (will be name), current_price (will be rateusd), image

        # Sample insert
        # cursor.execute(
        #     "INSERT INTO coins_coin (name,ticker,rateusd,image) VALUES (%s,%s, %s, %s)", ("polkadot", "DOT", 1, "polkadot.png"))

        for coin in json_data:
            # dot notation not working in python dict (not JS here)
            cursor.execute(
                "INSERT INTO coins_coin (name,ticker,rateusd,image) VALUES (%s, %s, %s,%s)", (coin['id'], coin['symbol'], coin['current_price'], coin['image']))

        # Save changes
        connection.commit()

        # Close db
        cursor.close()
        connection.close()
        print('Closed connection')

    except Exception as error:
        print('Could not connect:', error)


if __name__ == '__main__':
    connect()
