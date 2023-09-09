import sqlite3

connection = sqlite3.connect('hello.db')


with open('test.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

# insert_query = """INSERT INTO mytable
#                     (title, content)
#                     VALUES
#                     ('hello','yuh)"""

# cur.execute(insert_query)

connection.commit()
connection.close()
