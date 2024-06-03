from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb.cursors
from requests import request
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# DB 연결
def connect_to_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="os_project"
    )

# 회원가입 라우트
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    id = data['id']
    pw = data['pw']
    name = data['name']
    birth = data['birth']
    phone = data['phone']
    email = data['email']

    connection = connect_to_db()
    cursor = connection.cursor()
    sql = 'INSERT INTO user_info (user_id, user_pw, name, birth, phone, email) VALUES (%s, %s, %s, %s, %s, %s)'

    try:
        cursor.execute(sql, (id, pw, name, birth, phone, email))
        connection.commit()
        return jsonify({'success': True, 'message': '회원가입이 완료되었습니다.'})
    except Error as e:
        print(f"The error '{e}' occurred")
        return jsonify({'success': False, 'message': '회원가입 중 오류가 발생했습니다.'}), 500
    finally:
        cursor.close()
        connection.close()

# 아이디 중복 확인 라우트
@app.route('/check-duplicate', methods=['POST'])
def check_duplicate():
    data = request.json
    id = data['id']

    connection = connect_to_db()
    cursor = connection.cursor()
    sql = 'SELECT * FROM users WHERE user_id = %s'

    try:
        cursor.execute(sql, (id))
        result = cursor.fetchall()
        if result:
            return jsonify({'isDuplicate': True})
        else:
            return jsonify({'isDuplicate': False})
    except Error as e:
        print(f"The error '{e}' occurred")
        return jsonify({'success': False, 'message': '중복 확인 중 오류가 발생했습니다.'}), 500
    finally:
        cursor.close()
        connection.close()

# 로그인 함수
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user_id = data['userId']
    user_password = data['userPassword']
    
    try:
        user = check_user(user_id, user_password)
        if user:
            return jsonify({"message": "Login successful!", "user": user}), 200
        else:
            return jsonify({"message": "Login failed. Invalid ID or password."}), 401
    except Error as e:
        return jsonify({"error": str(e)}), 500

# 로그인 데이터 확인 함수
def check_user(user_id, user_password):
    connection = connect_to_db()
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE user_id = %s AND user_password = %s"
    cursor.execute(query, (user_id, user_password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return user

# 사용자 데이터 확인 함수
def get_user_info(user_id):
    connection = connect_to_db()
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE user_id = %s"
    cursor.execute(query, (user_id,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return user

# 회원 정보 확인 함수
@app.route('/userinfo', methods=['GET'])
def user_info():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "Missing user_id parameter"}), 400

    try:
        user = get_user_info(user_id)
        if user:
            return jsonify({"user": user}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Error as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
