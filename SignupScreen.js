import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const sendVerificationCode = async () => {
    const code = Math.floor(1000000 + Math.random() * 9000000).toString(); // 7자리 랜덤 숫자 생성
    setGeneratedCode(code);
    try {
      await axios.post('http://your-server-address/send-verification-code', { email, code });
      alert('인증번호가 이메일로 발송되었습니다.');
      setIsEmailVerified(true);
    } catch (error) {
      console.error(error);
      alert('인증번호 발송에 실패했습니다.');
    }
  };

  const handleVerification = () => {
    if (verificationCode === generatedCode) {
      alert('인증이 완료되었습니다.');
      // 추가적인 로직을 작성하세요 (예: 회원가입 처리)
    } else {
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/parachute.png')} style={styles.logo} />
        <Text style={styles.title}>(사이트이름)</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="생년월일 8자리"
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="휴대전화번호"
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          editable={!isEmailVerified}
        />
        {isEmailVerified && (
          <TextInput
            style={styles.input}
            placeholder="인증번호(코드)"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
        )}
      </View>
      {!isEmailVerified && (
        <TouchableOpacity style={styles.emailButton} onPress={sendVerificationCode}>
          <Text style={styles.buttonText}>이메일 인증하기</Text>
        </TouchableOpacity>
      )}
      {isEmailVerified && (
        <TouchableOpacity style={styles.signupButton} onPress={handleVerification}>
          <Text style={styles.buttonText}>가입하기</Text>
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
