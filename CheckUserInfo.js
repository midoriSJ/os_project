// 개인정보 확인 버튼 누르면 나오는 화면

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CheckUserInfo({ route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>개인정보 확인</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>아이디:</Text>
        <Text style={styles.info}>{user.id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>이름:</Text>
        <Text style={styles.info}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>생년월일:</Text>
        <Text style={styles.info}>{user.birthdate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>휴대전화번호:</Text>
        <Text style={styles.info}>{user.phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>이메일:</Text>
        <Text style={styles.info}>{user.email}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    fontSize: 16,
  },
});
