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
import requests
import mysql.connector
from mysql.connector import Error
from time import sleep


app = Flask(__name__)
CORS(app)

# Flask MySQL 설정
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'elskvhfh12'
app.config['MYSQL_DB'] = 'paraglidingApp'
app.config['SECRET_KEY'] = 'your_secret_key'

mysql = MySQL(app)

# OpenWeatherMap API 키
API_KEY = '111002b452c141798051161faec61742'

# 지역 리스트
cities = ["Gyeongsangnam-do", "Ulsan", "Jeollabuk-do", "Jeju", "Chungcheongnam-do", 
          "Gyeonggi-do", "Gangwon-do", "Gyeongsangbuk-do", "Gwangju", "Daegu", 
          "Chungcheongbuk-do", "Jeollanam-do", "Busan"]

def insert_weather_data(city, temperature, wind_speed, description):
    cur = mysql.connection.cursor()
    insert_query = """
    INSERT INTO weather_data (city, temperature, wind_speed, description)
    VALUES (%s, %s, %s, %s)
    """
    cur.execute(insert_query, (city, temperature, wind_speed, description))
    mysql.connection.commit()
    cur.close()

def get_weather_data(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    return {
        "city": data['name'],
        "temperature": data['main']['temp'],
        "wind_speed": data['wind']['speed'],
        "description": data['weather'][0]['description']
    }

def create_connection():
    try:
        connection = mysql.connect
        connection = mysql.connection
        if connection.is_connected():
            print("Connection to MySQL DB successful")
        return connection
    except Error as e:
        print(f"The error '{e}' occurred")
        return None


def fetch_and_store_weather_data():
    while True:
        with app.app_context():
            connection = create_connection()
            if not connection:
                return

            for city in cities:
                try:
                    weather_data = get_weather_data(city)
                    insert_weather_data(connection, weather_data['city'], weather_data['temperature'], weather_data['wind_speed'], weather_data['description'])
                    print(f"Weather data for {city} inserted successfully.")
                except Exception as e:
                    print(f"An error occurred for city {city}: {e}")
        sleep(1800)  # 30분마다 데이터 갱신

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

@app.route('/api/weather', methods=['POST'], endpoint='get_weather')
@token_required
def get_weather():
    data = request.get_json()
    factory_name = data.get('factoryName')

    if not factory_name:
        return jsonify({"error": "No factory name provided"}), 400

    factory_regions = {
        '각산이륙장': '경남',
        '간월재이륙장': '전남',
        '감악산이륙장': '강원',
        '경각산이륙장': '경기',
        '계룡산이륙장': '경남',
        '고근산이륙장': '경북',
        '고헌산(곰돌이)이륙장': '제주',
        '관모산이륙장': '강원',
        '광교산이륙장': '경남',
        '광의이륙장': '강원',
        '괘방산 활공장': '경남',
        '국당이륙장': '울산',
        '금오름이륙장': '광주',
        '기룡산 이륙장': '전북',
        '남산 이륙장': '전남',
        '남포이륙장': '강원',
        '노안이륙장': '대구',
        '논개이륙장': '강원',
        '달마산이륙장': '경남',
        '대관령 활공장': '충남',
        '대니산이륙장': '충남',
        '대릉산 이륙장': '충북',
        '대부도 구봉산 이륙장': '경남',
        '대암산이륙장': '전남',
        '덕기봉이륙장': '경남',
        '도비산 활공장': '경남',
        '두산 활공장': '경기',
        '마래산이륙장': '강원',
        '망실봉이륙장': '전북',
        '망운산이륙장': '경북',
        '매산리 활공장': '전북',
        '무릉 활공장': '경남',
        '무주이륙장': '경남',
        '무척산이륙장': '전북',
        '문경활공랜드': '경기',
        '미륵산이륙장': '경남',
        '미시령 활공장': '경북',
        '바람재이륙장': '전북',
        '박달산 활공장': '충남',
        '발례이륙장': '충북',
        '방광산이륙장': '경북',
        '방장산이륙장': '강원',
        '백월산이륙장': '강원',
        '백화산이륙장': '충남',
        '벽도산이륙장': '경남',
        '봉래산이륙장': '경남',
        '봉수대이륙장': '경기',
        '봉화산(당진) 활공장': '충남',
        '봉화산이륙장': '강원',
        '불탄산이륙장': '전남',
        '사곡이륙장': '제주',
        '사명산이륙장': '경기',
        '사자산이륙장': '경기',
        '서독산 활공장': '경기',
        '서우봉이륙장': '대전',
        '서운산 활공장': '제주',
        '송라산 활공장': '경북',
        '식장산이륙장': '충북',
        '안동길안이륙장': '경기',
        '양백산이륙장': '울산',
        '어섬 활공장': '경기',
        '연화산이륙장': '전남',
        '예봉산이륙장': '전남',
        '오봉산이륙장': '충남',
        '오산이륙장': '전북',
        '오서산 활공장': '경남',
        '오성산이륙장': '울산',
        '와룡산이륙장': '경기',
        '와우정사 활공장': '충남',
        '왜목 활공장': '경기',
        '원적산이륙장': '제주',
        '월랑봉이륙장': '경기',
        '유명산 활공장': '경기',
        '은봉산 활공장': '경남',
        '음달산이륙장': '경남',
        '자양산이륙장': '전남',
        '장동산이륙장': '강원',
        '장암산 활공장': '충남',
        '장암산이륙장': '전남',
        '재석산이륙장': '전남',
        '정광산이륙장': '경북',
        '주월산이륙장': '부산',
        '주작산이륙장': '전남',
        '진례이륙장': '전북',
        '진천 활공장': '경북',
        '창평이륙장': '경남',
        '초록봉 활공장': '강원',
        '칠포이륙장': '경기',
        '특리이륙장': '경북',
        '한우산이륙장': '경남',
        '향적봉이륙장': '경남',
        '형제봉이륙장': '전남',
        '혜음령이륙장': '강원',
        '호락산이륙장': '경기',
        '화순이륙장': '경북',
        '황금산이륙장': '전남',
        '황령산이륙장': '경남',
        '혹성산이륙장': '충북'
    }

    region = factory_regions.get(factory_name)

    if not region:
        return jsonify({"error": "Invalid factory name"}), 400

    # OpenWeatherMap API 요청
    weather_url = f'http://api.openweathermap.org/data/2.5/weather?q={region},KR&appid={API_KEY}&units=metric'
    response = requests.get(weather_url)
    weather_data = response.json()

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch weather data"}), response.status_code

    result = {
        "weather": weather_data["weather"][0]["description"],
        "temperature": weather_data["main"]["temp"],
        "wind_speed": weather_data["wind"]["speed"]
    }

    return jsonify(result)

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
