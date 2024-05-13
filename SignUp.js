import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Picker, ScrollView, CheckBox } from 'react-native';

const SignUp = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isValidUserId, setIsValidUserId] = useState(false); 
    const [isValidUserPassword, setIsValidUserPassword] = useState(false);
    const [checkBoxSurfing, setCheckBoxSurfing] = useState(false)
    const [checkBoxMountainClimbing, setCheckBoxMountainClimbing] = useState(false)
    const [checkBoxSeaFishing, setCheckBoxSeaFishing] = useState(false)
    const [checkBoxFishing, setCheckBoxFishing] = useState(false)
    const [checkBoxFarming, setCheckBoxFarming] = useState(false)
    const [userAge, setUserAge] = useState("1")

    const validateUserId = (input) => {
        const userIdRegex = /^[a-zA-Z0-9]{5,10}$/;
        setIsValidUserId(userIdRegex.test(input));
    };

    const validateUserPassword = (input) => {
        const userPasswordRegex = /^[a-zA-Z0-9]{10,16}$/;
        setIsValidUserPassword(userPasswordRegex.test(input)); // 비밀번호 유효성 검사 결과를 상태로 저장
    };

    const handleUserIdChange = (input) => {
        setUserId(input);
        validateUserId(input);
    };

    const handleUserPasswordChange = (input) => {
        setUserPassword(input);
        validateUserPassword(input);
    };

    const handleCheckDuplicate = () => {
        // 중복확인 로직
    };

    const handleSignUp = () => {
        // 회원가입 로직
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>아이디</Text>
                <TextInput
                    style={styles.input}
                    placeholder="영어와 숫자로 5~10자리"
                    value={userId}
                    onChangeText={handleUserIdChange}
                />
                <Button 
                    title="중복확인" 
                    onPress={handleCheckDuplicate} 
                    disabled={!userId || !isValidUserId}
                />
                <Text>비밀번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder="영어와 숫자로 10~16자리"
                    secureTextEntry={true}
                    value={userPassword}
                    onChangeText={handleUserPasswordChange}
                />

                <Text>연령</Text>
                <Picker 
                    style={styles.picker}
                    selectedValue={userAge}
                    onValueChange={(itemValue, itemIndex) => setUserAge(itemValue)}
                >
                    {[...Array(120)].map((_, index) => (
                        <Picker.Item key={index} label={`${index + 1}`} value={`${index + 1}`} />
                    ))}
                </Picker>

                <Text>분야</Text>
                <View style={styles.checkBoxContainer}>
                    <View style={styles.checkBox}>
                        <CheckBox
                            value={checkBoxSurfing}
                            onValueChange={(surfing) => setCheckBoxSurfing(surfing)}
                        />
                        <Text style={styles.checkBoxText}>서핑</Text>
                    </View>
                    <View style={styles.checkBox}>
                        <CheckBox
                            value={checkBoxMountainClimbing}
                            onValueChange={(mountainClimbing) => setCheckBoxMountainClimbing(mountainClimbing)}
                        />
                        <Text style={styles.checkBoxText}>등산</Text>
                    </View>
                    <View style={styles.checkBox}>
                        <CheckBox
                            value={checkBoxSeaFishing}
                            onValueChange={(seaFishing) => setCheckBoxSeaFishing(seaFishing)}
                        />
                        <Text style={styles.checkBoxText}>바다 낚시</Text>
                    </View>
                    <View style={styles.checkBox}>
                        <CheckBox
                            value={checkBoxFishing}
                            onValueChange={(fishing) => setCheckBoxFishing(fishing)}
                        />
                        <Text style={styles.checkBoxText}>어업</Text>
                    </View>
                    <View style={styles.checkBox}>
                        <CheckBox
                            value={checkBoxFarming}
                            onValueChange={(farming) => setCheckBoxFarming(farming)}
                        />
                        <Text style={styles.checkBoxText}>농업</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="회원가입"
                        onPress={handleSignUp}
                        disabled={!userId || !userPassword || !isValidUserId || !isValidUserPassword}
                        style = {styles.signUpButton}
                    />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpButton : {
        fontSize : 18,
        paddingHorizontal : 20,
    },
});

export default SignUp;
