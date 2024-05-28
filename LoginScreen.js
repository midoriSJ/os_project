// 로그인 페이지

import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/parachute.png')} style={styles.logo} />
        <Text style={styles.title}>(사이트이름)</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="아이디" />
        <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsLoggedIn(true); // 로그인 상태 업데이트
          navigation.navigate('Main'); // 메인 화면으로 이동
        }}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop : 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
