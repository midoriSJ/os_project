// 회원가입 페이지

import React from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/parachute.png')} style={styles.logo} />
        <Text style={styles.title}>(사이트이름)</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="아이디" />
        <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry />
        <TextInput style={styles.input} placeholder="이름" />
        <TextInput style={styles.input} placeholder="생년월일 8자리" />
        <TextInput style={styles.input} placeholder="휴대전화번호" />
        <TextInput style={styles.input} placeholder="이메일" />
        <TextInput style={styles.input} placeholder="인증번호(코드)" />
      </View>
      <TouchableOpacity style={styles.emailButton} onPress={() => {}}>
        <Text style={styles.buttonText}>이메일 인증하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={() => {}}>
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
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
  emailButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // 인증번호(코드) 칸과의 간격
    marginBottom: 10, // 가입하기 버튼과의 간격
  },
  signupButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
