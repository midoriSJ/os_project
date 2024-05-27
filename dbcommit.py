import requests
import mysql.connector

def connect_to_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="os_project"
    )


def get_weather_data():
    api_key = "111002b452c141798051161faec61742"
    city = "Cheonan"
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    response = requests.get(url)
    data = response.json()
    
    return {
        'city': data['name'],
        'temperature': data['main']['temp'],
        'feels_like' : data['main']['feels_like'],
        'temp_min' : data['main']['temp_min'],
        'temp_max' : data['main']['temp_max'],
        'humidity': data['main']['humidity'],
        'pressure' : data['main']['pressure'],
        'wind_speed' : data['wind']['speed'],
        'description': data['weather'][0]['description']
    }
    
def get_air_data():
    airKey = "111002b452c141798051161faec61742"
    airUrl = f"https://api.openweathermap.org/data/2.5/air_pollution?lat=36.8065&lon=127.1522&appid={airKey}&units=metric"
    response = requests.get(airUrl)
    airData = response.json()
    
    return {
        'pm2.5': airData['list'][0]['components']['pm2_5'],
        'pm10': airData['list'][0]['components']['pm10']
    }
    
def insert_weather_data(cursor, data):
    cursor.execute("""
    INSERT INTO weather_data (id, city, temperature, feels_like, temp_min,
    temp_max, humidity, pressure, wind_speed, description)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (10, data['city'], data['temperature'], data['feels_like'], data['temp_min'],
          data['temp_max'], data['humidity'], data['pressure'],
          data['wind_speed'], data['description']))

def insert_air_data(cursor, airData):
    cursor.execute("""
                    update weather_data set
                    pm2_5 = %s, pm10 = %s where city = "Cheonan";""",
                    (airData['pm2.5'],
                     airData['pm10']))

def main():
    # Get weather data
    weather_data = get_weather_data()
    air_data = get_air_data()
    
    # Connect to database
    db = connect_to_db()
    cursor = db.cursor()
    
    # Insert weather data
    insert_weather_data(cursor, weather_data)
    insert_air_data(cursor, air_data)
    
    # Commit and close
    db.commit()
    cursor.close()
    db.close()
    
    print("Weather data inserted successfully")

if __name__ == "__main__":
    main()

