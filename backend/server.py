# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS


import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)

@app.route('/add_one', methods=['POST'])

def add_one():
    data = request.get_json()
    number = data.get('number', 0)
    result = number + 1
    return jsonify({'result': result})
 
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
