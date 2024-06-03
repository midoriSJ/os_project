import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchWeatherData = async () => {
    try {
      const apiKey = '111002b452c141798051161faec61742';
      const city = 'Cheonan'; // 원하는 도시로 변경하세요.
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      await postDataToServer(response.data); // 수정: 날씨 데이터 전송
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchAirData = async () => {
    try {
      const apiKey = '111002b452c141798051161faec61742';
      const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=36.8065&lon=127.1522&appid=${apiKey}&units=metric`
   
      const response = await axios.get(airUrl);
      setAirData(response.data);
      await postDataToServer(response.data); // 수정: 대기 오염 데이터 전송
    } catch (error) {
      console.error('Error fetching air pollution data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchWeatherData();
      await fetchAirData();
      setLoading(false);
    };

    fetchData();
  }, []);

  const postDataToServer = async (data) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/data", { data });
      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting data to server:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Error fetching weather data</Text>
      </View>
    );
  }
  if (!airData) {
    return (
      <View style={styles.container}>
        <Text>Error fetching air pollution data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      <Text style={styles.weather}>City : {weatherData.name}</Text>
      <Text style={styles.weather}>Temperature : {weatherData.main.temp}°C</Text>
      <Text style={styles.weather}>Feels Like : {weatherData.main.feels_like}°C</Text>
      <Text style={styles.weather}>Temp_min : {weatherData.main.temp_min}°C</Text>
      <Text style={styles.weather}>Temp_max : {weatherData.main.temp_max}°C</Text>
      <Text style={styles.weather}>Humidity : {weatherData.main.humidity} %</Text>
      <Text style={styles.weather}>Pressure : {weatherData.main.pressure} hPa</Text>
      <Text style={styles.weather}>Wind : {weatherData.wind.speed} m/sec</Text>
      <Text style={styles.list}>pm2.5 : {airData.list[0].components.pm2_5} ㎍/㎥</Text>
      <Text style={styles.list}>pm10 : {airData.list[0].components.pm10} ㎍/㎥</Text>
      <Text style={styles.weather}>Description : {weatherData.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  weather: {
    fontSize: 18,
    marginBottom: 10,
  },
  list : {
    fontSize : 18,
    marginBottom : 10,
  },
});