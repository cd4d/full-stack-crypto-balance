from dotenv import load_dotenv
import os
import json
import psycopg2
load_dotenv()

# create table coins with this script, not manually
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
            "CREATE TABLE IF NOT EXISTS coins_coin (id serial PRIMARY KEY,name text,slug text,ticker text,rateusd numeric(8,2),image text)"
        )

        # Table coins_coin already exists. The fields in json file are: symbol (will be ticker), id (will be name), current_price (will be rateusd), image

        # Sample insert
        # cursor.execute(
        #     "INSERT INTO coins_coin (name,ticker,rateusd,image) VALUES (%s,%s, %s, %s)", ("polkadot", "DOT", 1, "polkadot.png"))
        position = 1  # starts with 1 to match SQL id
        for coin in json_data:
            # change field 'id' to 'slug' in local file
            coin['slug'] = coin['id']
            coin['id'] = position
            position = position + 1
            cursor.execute(
                "INSERT INTO coins_coin (id,name,slug,ticker,rateusd,image) VALUES (%s,%s,%s, %s, %s,%s)", (coin['id'], coin['name'], coin['slug'],  coin['symbol'], coin['current_price'], coin['image']))

        # save changes to local file with id, to be used
        out_file = open('coins-list-sorted-with-id.json', 'w')
        json.dump(json_data, out_file, indent=6)
        out_file.close()
        # Save changes in db
        connection.commit()

        # Close db
        cursor.close()
        connection.close()
        print('Closed connection')

    except Exception as error:
        print('Error:', error)


if __name__ == '__main__':
    connect()
