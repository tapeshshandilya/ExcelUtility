from flask import Flask, jsonify, request
import sqlite3

# creating the flask app
app = Flask(__name__)

conn = sqlite3.connect('example.db')
print("Opened database successfully")
cur = conn.cursor()
# Create table
cur.execute('''CREATE TABLE tblPartDetails
                      (ChildPartNumber text, ChildPartDescription text, ItemReferenceNumber text, QuantityProduction text)''')

print("Table created successfully")
conn.close()

# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
@app.route('/excelUtility/', methods=['POST'])
    # Corresponds to POST request
def uploadFile():
        data = request.get_json()  # status code
        con = sqlite3.connect('example.db')
        cur = con.cursor()

        # Insert a row of data
        cur.execute("INSERT INTO tblPartDetails VALUES (data.(ChildPartNumber ,data.ChildPartDescription ,data.ItemReferenceNumber ,data.QuantityProduction )")

        con.commit()
        con.close()
        return jsonify({'data': data}), 201


@app.route('/excelUtility/', methods=['GET'])
def getRecords():
    con = sql.connect("example.db")
    con.row_factory = sql.Row

    cur = con.cursor()
    cur.execute("select * from tblPartDetails")
    rows = cur.fetchall();
    return rows


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)