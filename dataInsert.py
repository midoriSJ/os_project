from flask import Flask, request, jsonify
import pymysql

def create_app():
    app = Flask(__name__)
    port = 3306

    # MySQL 연결 설정
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='1234',
        database='os_project'
    )

    @app.route('/api/data', methods=['POST'])
    def insert_data():
        try:
            data = request.json
            weather_data = data.get('weatherData')
            air_data = data.get('airData')

            # MySQL에 데이터 삽입
            with connection.cursor() as cursor:
                sql = "INSERT INTO weather_data (city, temperature, feels_like, temp_min, temp_max, humidity, pressure, wind_speed, pm2_5, pm10, description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (weather_data['name'], weather_data['main']['temp'], weather_data['main']['feels_like'], weather_data['main']['temp_min'], weather_data['main']['temp_max'], weather_data['main']['humidity'], weather_data['main']['pressure'], weather_data['wind']['speed'], air_data['list'][0]['components']['pm2_5'], air_data['list'][0]['components']['pm10'], weather_data['weather'][0]['description']))
                connection.commit()
                return 'Weather data inserted successfully', 200
        except Exception as e:
            print('Error inserting weather data:', e)
            return 'Error inserting weather data', 500

    if __name__ == '__main__':
        app.run(port=port)
        insert_data()

create_app()
