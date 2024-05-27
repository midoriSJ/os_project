from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def connect_to_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="os_project"
    )

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    id = data.get('id')
    pw = data.get('password')
    name = data.get('name')
    birth = data.get('birth')
    phone = data.get('phone')
    email = data.get('email')
    
    if not id:
        return jsonify({'message': 'ID required'}), 400
    if not pw:
        return jsonify({'message': 'password is required'}), 400
    if not name:
        return jsonify({'message': 'name is required'}), 400
    if not birth:
        return jsonify({'message': 'birthdate is required'}), 400
    if not phone:
        return jsonify({'message': 'phone number is required'}), 400
    if not email:
        return jsonify({'message': 'email is required'}), 400

    db = connect_to_db()
    cursor = db.cursor()

    try:
        cursor.execute("""
            INSERT INTO user_info
            (user_id, user_pw, name, birth, phone, email)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (id, pw, name, birth, phone, email))
        db.commit()
    except mysql.connector.Error as err:
        return jsonify({'message': f'Error: {err}'}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({'message': 'User added successfully'}), 201

if __name__ == "__main__":
    app.run(debug=True)
