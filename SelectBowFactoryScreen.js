// 활공장 선택 누르면 나오는 페이지

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const regions = [
  { name: '서울', factories: ['대부도수련원 이륙장'] },
  { name: '경기도', factories: ['경기 활공장1', '경기 활공장2'] },
  { name: '강원도', factories: ['강원 활공장1', '강원 활공장2'] },
  { name: '충청도', factories: ['충청 활공장1', '충청 활공장2'] },
  { name: '경상도', factories: ['경상 활공장1', '경상 활공장2'] },
  { name: '전라도', factories: ['전라 활공장1', '전라 활공장2'] },
  { name: '제주', factories: ['제주 활공장1', '제주 활공장2'] },
];

export default function SelectBowFactoryScreen({ navigation }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredFactories, setFilteredFactories] = useState([]);
  const [selectedFactory, setSelectedFactoryLocal] = useState(null);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = regions.flatMap(region => 
        region.factories.filter(factory => factory.includes(text))
      );
      setFilteredFactories(filtered);
    } else {
      setFilteredFactories([]);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setFilteredFactories(region.factories);
    setSearchText('');
  };

  const handleFactorySelect = (factory) => {
    setSelectedFactoryLocal(factory);
  };

  const handleConfirm = () => {
    if (selectedFactory) {
      navigation.navigate('BowFactory', { selectedFactory });
    } else {
      alert('활공장을 선택하세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>활공장 선택</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="활공장을 검색해 주세요"
        value={searchText}
        onChangeText={handleSearch}
      />
      <View style={styles.selectionContainer}>
        <View style={styles.regionColumn}>
          <ScrollView>
            {regions.map((region) => (
              <TouchableOpacity key={region.name} onPress={() => handleRegionSelect(region)}>
                <Text style={[
                  styles.regionText,
                  selectedRegion?.name === region.name && styles.selectedRegionText
                ]}>{region.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.factoryColumn}>
          <ScrollView>
            {filteredFactories.map((factory, index) => (
              <TouchableOpacity key={index} onPress={() => handleFactorySelect(factory)}>
                <Text style={[
                  styles.factoryText,
                  selectedFactory === factory && styles.selectedFactoryText
                ]}>{factory}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  regionColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  regionText: {
    fontSize: 16,
    padding: 10,
  },
  selectedRegionText: {
    backgroundColor: '#e0f7fa',
  },
  factoryColumn: {
    flex: 2,
    paddingLeft: 10,
  },
  factoryText: {
    fontSize: 16,
    padding: 10,
  },
  selectedFactoryText: {
    backgroundColor: '#c8e6c9',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
