from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb.cursors
from requests import request
from mysql.connector import Error
import sqlite3, json, bcrypt

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
def query_user(id):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE id=?", (id,))
    user = c.fetchone()
    conn.close()
    return user

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    id = data.get('id')
    pw = data.get('pw')
    
    user = query_user(id)
    
    if user:
        if user[1] == pw:
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'error': 'invalid_pw'})
    else:
        return jsonify({'success': False, 'error': 'invalid_id'})

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
def get_user_info():
    user_id = request.args.get('user_id')

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))
    user = cursor.fetchone()

    if user:
        return jsonify({
            'id': user['id'],
            'username': user['username'],
            'name': user['name'],
            'birthdate': user['birthdate'].strftime('%Y-%m-%d'),
            'phone': user['phone'],
            'email': user['email']
        })
    else:
        return jsonify({'error': 'User not found'}), 404

# 회원 탈퇴 함수
@app.route('/delete-user', methods=['DELETE'])
def delete_user():
    data = request.json
    password = data.get('password')
    
    user_id = 'example_user_id'
    
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE id = %s AND pw = %s', (user_id, password))
    user = cursor.fetchone()
    
    if user:
        cursor.execute('DELETE FROM users WHERE id = %s', (user_id,))
        mysql.connection.commit()
        return jsonify({'success': True, 'message': '회원 탈퇴가 성공적으로 처리되었습니다.'})
    else:
        return jsonify({'success': False, 'message': '잘못된 비밀번호입니다.'}), 400

# 게시글 작성 함수
@app.route('/add-post', methods=['POST'])
def add_post():
    data = request.json
    title = data.get('title')
    location = data.get('location')
    content = data.get('content')
    images = data.get('images')  # 이미지 URL 리스트

    # 이미지 URL 리스트를 JSON 문자열로 변환하여 저장
    image_urls = json.dumps(images)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('''
        INSERT INTO board2 (title2, content2, place2, image)
        VALUES (%s, %s, %s, %s)
    ''', (title, location, content, image_urls))
    mysql.connection.commit()

    return jsonify({'success': True, 'message': '게시글이 성공적으로 저장되었습니다.'})

# 회원 정보 수정 함수
@app.route('/update-user', methods=['POST'])
def update_user():
    data = request.json
    username = data.get('username')
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
    user = cursor.fetchone()

    if user:
        if bcrypt.checkpw(current_password.encode('utf-8'), user['password'].encode('utf-8')):
            if new_password:
                hashed_new_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
                cursor.execute('''
                    UPDATE user_info 
                    SET name = %s, phone = %s, email = %s, user_pw = %s
                    WHERE name = %s
                ''', (name, phone, email, hashed_new_password, username))
            else:
                cursor.execute('''
                    UPDATE user_info 
                    SET name = %s, phone = %s, email = %s
                    WHERE name = %s
                ''', (name, phone, email, username))

            mysql.connection.commit()
            return jsonify({'success': True, 'message': 'User info updated successfully'})
        else:
            return jsonify({'success': False, 'message': 'Current password is incorrect'}), 400
    else:
        return jsonify({'success': False, 'message': 'User not found'}), 404

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')