import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidId, setIsValidId] = useState(false);
  const [isValidPw, setIsValidPw] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidBirth, setIsValidBirth] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);

  const validateId = (input) => {
    const userIdRegex = /^[a-zA-Z0-9]{5,10}$/;
    setIsValidId(userIdRegex.test(input));
    setIsIdChecked(false); // 입력이 바뀌면 다시 중복 확인 필요
  };

  const validatePw = (input) => {
    const userPasswordRegex = /^[a-zA-Z0-9]{10,16}$/;
    setIsValidPw(userPasswordRegex.test(input));
  };

  const handleSignup = async () => {
    if (!isEmailVerified) {
      alert('이메일 인증이 필요합니다.');
      return;
    }

    if (!isValidId || !isValidPw || !isValidName || !isValidBirth || !isValidPhone) {
      alert('모든 정보를 올바르게 입력해 주세요.');
      return;
    }

    if (!isIdChecked) {
      alert('아이디 중복 확인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post('http://your-server-address/signup', {
        id,
        pw,
        name,
        birth,
        phone,
        email,
      });
      if (response.data.success) {
        alert('회원가입이 완료되었습니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleCheckDuplicate = async () => {
    try {
      const response = await axios.post('http://your-server-address/check-duplicate', { id });
      if (response.data.isDuplicate) {
        alert('중복된 아이디입니다.');
        setIsIdChecked(false);
      } else {
        alert('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      }
    } catch (error) {
      console.error(error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

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
      handleSignup();
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
        <View style={styles.idContainer}>
          <TextInput
            style={styles.idInput}
            placeholder="아이디(영어+숫자 10자리)"
            value={id}
            onChangeText={(text) => {
              setId(text);
              validateId(text);
            }}
            editable={!isEmailVerified}
          />
          <TouchableOpacity style={styles.checkButton} onPress={handleCheckDuplicate}>
            <Text style={styles.buttonText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="비밀번호(영어+숫자 10~16자리)"
          secureTextEntry={true}
          value={pw}
          onChangeText={(text) => {
            setPw(text);
            validatePw(text);
          }}
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setIsValidName(text.length > 0);
          }}
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="생년월일 8자리"
          value={birth}
          onChangeText={(text) => {
            setBirth(text);
            setIsValidBirth(text.length === 8 && !isNaN(text));
          }}
          editable={!isEmailVerified}
        />
        <TextInput
          style={styles.input}
          placeholder="휴대전화번호"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setIsValidPhone(text.length >= 10 && !isNaN(text));
          }}
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
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  checkButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
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
    marginTop: 10,
    marginBottom: 10,
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
