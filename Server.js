const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3306;

app.use(bodyParser.json());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'os_project'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API 라우팅
app.post('/api/data', (req, res) => {
  const weatherData = req.body.weatherData;
  const airData = req.body.airData;

  // MySQL에 데이터 삽입
  const sql = "INSERT INTO weather_data (city, temperature, feels_like, temp_min, temp_max, humidity, pressure, wind_speed, pm2_5, pm10, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [weatherData.name, weatherData.main.temp, weatherData.main.feels_like, weatherData.main.temp_min, weatherData.main.temp_max, weatherData.main.humidity, weatherData.main.pressure, weatherData.wind.speed, airData.list[0].components.pm2_5, airData.list[0].components.pm10, weatherData.weather[0].description], (err, result) => {
    if (err) {
      console.error('Error inserting weather data:', err);
      res.status(500).send('Error inserting weather data');
    } else {
      console.log('Weather data inserted successfully');
      res.status(200).send('Weather data inserted successfully');
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
