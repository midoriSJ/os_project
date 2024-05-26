// 활공장에 대한 자세한 정보를 출력하는 페이지

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FirstBowFactoryInfoScreen({ route }) {
  const { selectedFactory } = route.params;

  const factoryDetails = {
    '대부도수련원 이륙장': {
      temperature: '36.5°',
      windDirection: '남서풍',
      windSpeed: '3.4m/s',
      cloudCoverage: '적음',
      directions: '가는길 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      parking: '주차장소 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
    },
    // 다른 활공장에 대한 정보 추가
  };

  const details = factoryDetails[selectedFactory] || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedFactory}</Text>
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>36.5°</Text>
        <Text style={styles.weatherInfo}>날씨특보 - </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>풍향</Text>
          <Text style={styles.infoContent}>{details.windDirection}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>풍속</Text>
          <Text style={styles.infoContent}>{details.windSpeed}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>구름양</Text>
          <Text style={styles.infoContent}>{details.cloudCoverage}</Text>
        </View>
      </View>
      <Text style={styles.subTitle}>가는길</Text>
      <Text style={styles.detailsText}>{details.directions}</Text>
      <Text style={styles.subTitle}>주차장소</Text>
      <Text style={styles.detailsText}>{details.parking}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 10,
  },
  weatherInfo: {
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 16,
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
  },
});
