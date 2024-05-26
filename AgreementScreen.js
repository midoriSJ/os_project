import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function AgreementScreen({ navigation }) {
  const [isAgreeAll, setIsAgreeAll] = useState(false);
  const [isAgreeNaver, setIsAgreeNaver] = useState(false);
  const [isAgreePrivacy, setIsAgreePrivacy] = useState(false);
  const [isAgreeRealName, setIsAgreeRealName] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    // 필수 항목들이 모두 체크되었는지 확인
    if (isAgreeNaver && isAgreePrivacy) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [isAgreeNaver, isAgreePrivacy]);

  const handleAgreeAll = () => {
    const newValue = !isAgreeAll;
    setIsAgreeAll(newValue);
    setIsAgreeNaver(newValue);
    setIsAgreePrivacy(newValue);
    setIsAgreeRealName(newValue);
  };

  const handleNext = () => {
    if (isNextEnabled) {
      navigation.navigate('SignUpScreen');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.siteName}>(사이트이름)</Text>
        </View>
        <View style={styles.agreementContainer}>
          <View style={styles.agreementItem}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isAgreeAll} onValueChange={handleAgreeAll} />
              <Text style={styles.agreementTitle}>전체 동의하기</Text>
            </View>
            <Text style={styles.agreementDescription}>
              실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트 • 혜택 정보 수신(선택) 동의를 포함합니다.
            </Text>
          </View>
          <View style={styles.agreementItem}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isAgreeNaver} onValueChange={setIsAgreeNaver} />
              <Text style={styles.agreementTitle}>[필수] 네이버 이용약관 전체</Text>
            </View>
            <Text style={styles.agreementContent}>
              여러분을 환영합니다. 네이버 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사의 회원과 네이버 서비스를 이용하는 여러분 간의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 다양한 정보들을 포함하고 있습니다.
            </Text>
          </View>
          <View style={styles.agreementItem}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isAgreePrivacy} onValueChange={setIsAgreePrivacy} />
              <Text style={styles.agreementTitle}>[필수] 개인정보 수집 및 이용 전체</Text>
            </View>
            <Text style={styles.agreementContent}>
              개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
            </Text>
          </View>
          <View style={styles.agreementItem}>
            <View style={styles.checkboxContainer}>
              <CheckBox value={isAgreeRealName} onValueChange={setIsAgreeRealName} />
              <Text style={styles.agreementTitle}>[선택] 실명 인증된 아이디로 가입</Text>
            </View>
            <Text style={styles.agreementContent}>
              실명 인증된 아이디로 가입하기 위해서는 관련 정보를 입력해야 합니다. 자세한 내용은 관련 약관을 참고해주세요.
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.nextButton, isNextEnabled ? styles.nextButtonEnabled : styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!isNextEnabled}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  siteName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  agreementContainer: {
    paddingHorizontal: 16,
  },
  agreementItem: {
    marginBottom: 20,
  },
  agreementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  agreementDescription: {
    fontSize: 14,
    color: '#666',
  },
  agreementContent: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nextButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 5,
  },
  nextButtonEnabled: {
    backgroundColor: '#007bff',
  },
  nextButtonDisabled: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
