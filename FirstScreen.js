// 회원가입과 로그인 버튼이 있는 첫 화면

import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const FirstScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../assets/parachute.png')} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={() => {}} color="#007bff" />
        <View style={styles.spacing} />
        <Button title="회원가입" onPress={() => {}} color="#007bff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  spacing: {
    height: 10,
  },
});

export default FirstScreen