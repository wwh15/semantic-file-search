# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3


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

    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM table').fetchall()
    conn.close()
    
    return jsonify({'result': posts[2][2]})
    

    # return jsonify({'result': input})
    
 
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# # Route for seeing a data
# @app.route('/data')
# def get_time():
 
#     # Returning an api for showing in reactjs
#     return {
#         'Name':"geek",
#         "Age":"22",
#         "Date":x,
#         "programming":"python"
#         }
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)
