import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Picker, ScrollView, CheckBox } from 'react-native';

const SignUp = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [checkValidUserId, setCheckValidUserId] = useState(false); 
    const [checkValidUserPassword, setCheckValidUserPassword] = useState(false);
    const [checkBoxSports, setCheckBoxSports] = useState(false)
    const [checkBoxFishing, setCheckBoxFishing] = useState(false)
    const [userAge, setUserAge] = useState("1")

    const validUserId = (input) => {
        const userIdRegex = /^[a-zA-Z0-9]{5,10}$/;
        setCheckValidUserId(userIdRegex.test(input));
    };

    const validUserPassword = (input) => {
        const userPasswordRegex = /^[a-zA-Z0-9]{10,16}$/;
        setCheckValidUserPassword(userPasswordRegex.test(input)); // 비밀번호 유효성 검사 결과를 상태로 저장
    };

    const handleUserIdChange = (input) => {
        setUserId(input);
        validUserId(input);
    };

    const handleUserPasswordChange = (input) => {
        setUserPassword(input);
        validUserPassword(input);
    };

    const handleCheckDuplicate = () => {
        // 중복확인 로직
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>아이디</Text>
                <TextInput
                    style = {styles.input} // 입력 받는 타입으로 칸 생성
                    placeholder = "영어와 숫자로 5~10자리" // 빈칸일 때는 출력했다가 유저가 입력할 때는 사라지게 만들기
                    value = {userId} // 빈칸에 입력된 문자열은 userId에 저장
                    onChangeText = {handleUserIdChange} // 입력값이 변경될 때마다 유효성 검사 수행
                ></TextInput>
                <Button 
                    title = "중복확인" 
                    onPress = {handleCheckDuplicate} 
                    disabled = {!userId || !isValidUserId} // 아이디가 비어있거나 유효하지 않으면 비활성화
                ></Button>
                <Text>비밀번호</Text>
                <TextInput
                    style = {styles.input}
                    placeholder = "영어와 숫자로 10~16자리"
                    secureTextEntry = {true} // 유저가 입력하면 마스킹된 형태로 출력
                    value = {userPassword}
                    onChangeText = {setUserPassword}
                ></TextInput>

                <Text>연령</Text>
                <Picker 
                  style = {styles.picker}
                  selectedValue = {userAge}
                  onValueChange = {(itemValue, itemIndex) => setUserAge(itemValue)}
                  >
                  <Picker.Item label = "1" value = "1"/>
                  <Picker.Item label = "2" value = "2"/>
                  <Picker.Item label = "3" value = "3"/>
                  <Picker.Item label = "4" value = "4"/>
                  <Picker.Item label = "5" value = "5"/>
                </Picker>

                <Text>분야</Text>
                <View style = {styles.checkBoxContainer}>
                    <View style={styles.checkBox}>
                        <CheckBox
                            value={checkBoxSports}
                            onValueChange={(surfing) => setCheckBoxSports(surfing)}
                        />
                        <Text style={styles.checkBoxText}>서핑</Text>
                    </View>
                    <View style={styles.checkBox}>
                        <CheckBox
                            value={checkBoxFishing}
                            onValueChange={(fishing) => setCheckBoxFishing(fishing)}
                        />
                        <Text style={styles.checkBoxText}>어업</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 100,
        flex: 1,
        alignItems: "center",
    },
    checkBoxContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxText: {
        marginLeft: 5
    },
});

export default SignUp