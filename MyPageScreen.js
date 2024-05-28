// 마이페이지

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyPageScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangeUserInfo')}>
        <Text style={styles.buttonText}>개인정보 확인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangeUserInfo')}>
        <Text style={styles.buttonText}>개인정보 수정</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeleteAccount')}>
        <Text style={styles.buttonText}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop : 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
