from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import bcrypt
import random
import smtplib
from email.mime.text import MIMEText
import jwt
import datetime
import pytz

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'elskvhfh12'
app.config['MYSQL_DB'] = 'paraglidingApp'
app.config['SECRET_KEY'] = 'your_secret_key'

mysql = MySQL(app)

verification_codes = {}

def generate_verification_code():
    return ''.join(random.choices('0123456789', k=7))

def token_required(f):
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            request.user = data['username']
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(*args, **kwargs)
    return decorator

@app.route('/api/signup', methods=['POST'], endpoint='signup')
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    name = data['name']
    birthdate = data['birthdate']
    phone = data['phone']
    email = data['email']
    
    try:
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (username, password, name, birthdate, phone, email) VALUES (%s, %s, %s, %s, %s, %s)", 
                    (username, hashed_password, name, birthdate, phone, email))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"message": "Error during registration", "error": str(e)}), 500

@app.route('/api/login', methods=['POST'], endpoint='login')
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT password FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        cur.close()
        
        if user:
            print(f"User found: {user[0]}")
        else:
            print("No user found")
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
            token = jwt.encode({
                'username': username,
                'exp': datetime.datetime.now(pytz.UTC) + datetime.timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm='HS256')
            return jsonify({"message": "Login successful", "token": token}), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        print(f"Error during login: {e}")  # 오류 메시지 출력
        return jsonify({"message": "Error during login", "error": str(e)}), 500


@app.route('/api/logout', methods=['POST'], endpoint='logout')
@token_required
def logout():
    token = request.headers['Authorization'].split(" ")[1]
    if token:
        return jsonify({"message": "Logout successful"}), 200
    else:
        return jsonify({"message": "Token is missing"}), 401

@app.route('/api/check-username', methods=['POST'], endpoint='check_username')
def check_username():
    data = request.get_json()
    username = data['username']
    
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        cur.close()
        
        if user:
            return jsonify({"message": "Username is already taken", "available": False}), 200
        else:
            return jsonify({"message": "Username is available", "available": True}), 200
    except Exception as e:
        return jsonify({"message": "Error checking username", "error": str(e)}), 500


@app.route('/api/update-user', methods=['POST'], endpoint='update_user')
@token_required
def update_user():
    data = request.get_json()
    current_password = data['currentPassword']
    new_password = data['newPassword']
    email = data['email']
    
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT password FROM users WHERE username = %s", (request.user,))
        user = cur.fetchone()
        
        if user and bcrypt.checkpw(current_password.encode('utf-8'), user[0].encode('utf-8')):
            hashed_new_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            cur.execute("UPDATE users SET password = %s, email = %s WHERE username = %s", 
                        (hashed_new_password, email, request.user))
            mysql.connection.commit()
            cur.close()
            return jsonify({"message": "User updated successfully", "success": True}), 200
        else:
            return jsonify({"message": "Invalid credentials", "success": False}), 401
    except Exception as e:
        return jsonify({"message": "Error updating user", "error": str(e), "success": False}), 500

@app.route('/api/launchsites', methods=['GET'], endpoint='get_launch_sites')
@token_required
def get_launch_sites():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, name FROM launch_sites")
        launch_sites = cur.fetchall()
        cur.close()
        
        launch_sites_list = []
        for site in launch_sites:
            launch_sites_list.append({"id": site[0], "name": site[1]})
        
        return jsonify(launch_sites_list)
    except Exception as e:
        return jsonify({"message": "Error retrieving launch sites", "error": str(e)}), 500

@app.route('/api/weather', methods=['GET'], endpoint='weather')
@token_required
def weather():
    weather_data = {
        "weather": "Sunny",
        "wind": "5 km/h NW",
        "clouds": "10%"
    }
    return jsonify(weather_data)

@app.route('/api/getPosts', methods=['GET'], endpoint='get_posts')
@token_required
def get_posts():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, title, content, image FROM posts")
        posts = cur.fetchall()
        cur.close()
        
        posts_list = []
        for post in posts:
            posts_list.append({"id": post[0], "title": post[1], "content": post[2], "image": post[3]})
        
        print(f"Posts fetched: {posts_list}")  # 디버깅 출력 추가
        
        return jsonify(posts_list)  # 빈 리스트도 반환됨
    except Exception as e:
        print(f"Error retrieving posts: {e}")  # 오류 메시지 출력
        return jsonify({"message": "Error retrieving posts", "error": str(e)}), 500


@app.route('/api/createPosts', methods=['POST'], endpoint='create_post')
@token_required
def create_post():
    title = request.form['title']
    location = request.form['location']
    content = request.form['content']
    image = request.files.get('image')
    
    try:
        cur = mysql.connection.cursor()
        if image:
            image_path = 'uploads/' + image.filename
            image.save(image_path)
            cur.execute("INSERT INTO posts (title, location, content, image) VALUES (%s, %s, %s, %s)", 
                        (title, location, content, image_path))
        else:
            cur.execute("INSERT INTO posts (title, location, content) VALUES (%s, %s, %s)", 
                        (title, location, content))
        
        mysql.connection.commit()
        cur.close()
        
        return jsonify({"message": "Post created successfully"}), 201
    except Exception as e:
        return jsonify({"message": "Error creating post", "error": str(e)}), 500

@app.route('/api/send-code', methods=['POST'], endpoint='send_code')
def send_code():
    data = request.get_json()
    email = data['email']
    code = generate_verification_code()

    verification_codes[email] = code

    msg = MIMEText(f"아래의 인증번호를 정확히 입력해주세요.\n {code}")
    msg['Subject'] = 'GlideMate 회원가입을 위한 이메일 인증번호입니다.'
    msg['From'] = 'nskfn02@naver.com'
    msg['To'] = email

    try:
        with smtplib.SMTP_SSL('smtp.naver.com', 465) as server:
            server.login('nskfn02@naver.com', 'elskvhfh12')
            server.sendmail('nskfn02@naver.com', email, msg.as_string())
        
        return jsonify({"message": "Verification code sent"}), 200
    except Exception as e:
        return jsonify({"message": "Error sending verification code", "error": str(e)}), 500

@app.route('/api/verify-code', methods=['POST'], endpoint='verify_code')
def verify_code():
    data = request.get_json()
    email = data['email']
    received_code = data['code']
    
    if email in verification_codes and verification_codes[email] == received_code:
        return jsonify({"message": "Verification code is correct"}), 200
    else:
        return jsonify({"message": "Verification code is incorrect"}), 400

@app.route('/api/delete-user', methods=['DELETE'], endpoint='delete_user')
@token_required
def delete_user():
    data = request.get_json()
    password = data['password']
    
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT password FROM users WHERE username = %s", (request.user,))
        user = cur.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
            cur.execute("DELETE FROM users WHERE username = %s", (request.user,))
            mysql.connection.commit()
            cur.close()
            return jsonify({"message": "User deleted successfully", "success": True}), 200
        else:
            return jsonify({"message": "Invalid credentials", "success": False}), 401
    except Exception as e:
        return jsonify({"message": "Error deleting user", "error": str(e), "success": False}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
