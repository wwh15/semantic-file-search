import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

insert_query = """INSERT INTO posts
                    (title, content)
                    VALUES
                    ('hello','yuh')"""

cur.execute(insert_query)

connection.commit()
connection.close()