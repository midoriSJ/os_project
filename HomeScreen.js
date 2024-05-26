// 하단 탭에서 홈 누르면 나오는 페이지

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/parachute.png')} style={styles.logo} />
        <Text style={styles.siteName}>(사이트이름)</Text>
      </View>
      <View style={styles.weatherSection}>
        <Text style={styles.sectionTitle}>활공장</Text>
        <View style={styles.weatherCard}>
          <Text style={styles.weatherLocation}>~~ 활공장</Text>
          <View style={styles.weatherInfo}>
            <Image source={{ uri: 'https://i.imgur.com/llF5iyg.png' }} style={styles.weatherIcon} />
            <Text style={styles.temperature}>36.5°</Text>
            <Text style={styles.weatherDetails}>날씨특보 -</Text>
          </View>
          <View style={styles.weatherStats}>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherStatLabel}>풍향</Text>
              <Text style={styles.weatherStatValue}>남서풍</Text>
            </View>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherStatLabel}>풍속</Text>
              <Text style={styles.weatherStatValue}>3.4m/s</Text>
            </View>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherStatLabel}>구름양</Text>
              <Text style={styles.weatherStatValue}>적음</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.boardSection}>
        <Text style={styles.sectionTitle}>게시판</Text>
        <View style={styles.boardCard}>
          <Text>자유게시판 (제목)</Text>
          <Text>모임게시판 (제목)</Text>
          <Text>자유게시판 (제목)</Text>
          <Text>자유게시판 (제목)</Text>
          <Text>모임게시판 (제목)</Text>
          <Text>자유게시판 (제목)</Text>
          <Text>모임게시판 (제목)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingLeft : 16
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  siteName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  weatherLocation: {
    fontSize: 16,
    marginBottom: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    marginRight: 10,
  },
  weatherDetails: {
    fontSize: 14,
    color: '#666',
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherStat: {
    alignItems: 'center',
  },
  weatherStatLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  weatherStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  boardSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  boardCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
