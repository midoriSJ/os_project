// 활공장 선택하는 메인 페이지

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BowFactoryScreen({ route, navigation }) {
  const selectedFactory = route.params?.selectedFactory || '활공장을 선택해 주세요';

  const summaryData = {
    '대부도수련원 이륙장': '대부도수련원 이륙장은 서울에 위치한 대표적인 활공장입니다.',
    '경기 활공장1': '경기 활공장1은 경기도에 위치한 활공장으로, 초보자에게 적합합니다.',
    // 다른 활공장에 대한 요약 추가
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>활공장</Text>
      <View style={styles.selectedFactoryContainer}>
        <Text style={styles.selectedFactoryText}>{selectedFactory}</Text>
        <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('SelectBowFactory')}>
          <Text style={styles.buttonText}>선택</Text>
        </TouchableOpacity>
      </View>
      {selectedFactory !== '활공장을 선택해 주세요' && (
        <TouchableOpacity
          style={styles.summaryContainer}
          onPress={() => navigation.navigate('FirstBowFactoryInfo', { selectedFactory })}
        >
          <Text style={styles.summaryTitle}>{selectedFactory}</Text>
          <Text style={styles.summaryText}>{summaryData[selectedFactory]}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedFactoryContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedFactoryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
});
