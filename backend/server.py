# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

from transformerTE import *

import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)



def get_db_connection():
    conn = sqlite3.connect('pod_data.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/process_string', methods=['POST'])
def process_string():
    data = request.get_json()
    input = data.get('inputString', '')
    matches = data.get('number', 0)

    results = get_info(input, matches)

    # conn = get_db_connection()
    # # Using test file 
    # posts = conn.execute('SELECT * FROM test').fetchall()
    
    # conn.close()

    # for i in range(len(posts)):
    #     if posts[i][0] is not None:
    #         charlst = posts[i][0].split(" ")
    #         if input in charlst:
    #             lst.append(posts[i][0])
    
    return jsonify({'output': results})
        
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)
