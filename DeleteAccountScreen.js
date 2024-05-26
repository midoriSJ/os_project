// 회원탈퇴 페이지

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function DeleteAccountScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('https://your-api-endpoint.com/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // 성공적으로 삭제된 경우 로그인 페이지로 이동
        alert('회원 탈퇴가 성공적으로 처리되었습니다.');
        navigation.navigate('Login');
      } else {
        // 삭제 실패 시 에러 메시지 출력
        alert(result.message || '회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>회원탈퇴</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요."
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>회원탈퇴</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
