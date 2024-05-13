import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
// 데이터 베이스가 아직 완성이 안 됐기에 임시로 정함
const mockDatabaseUserInfo = {
    user_id : 'testuser',
    user_password : 'password123',
};

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if(userId === mockDatabaseUserInfo.user_id && password === mockDatabaseUserInfo.user_password){ // 입력한 아이디와 비밀번호가 DB에 저장된 정보와 모두 일치할 때
            // 로그인 성공 시 메인 페이지로 이동하는 로직 추가
            Alert.alert("로그인 성공")
        } else if(userId === mockDatabaseUserInfo.user_id && password !== mockDatabaseUserInfo.user_password){ // 입력한 아이디는 일치하지만 비밀번호는 일치하지 않을 때
            Alert.alert("비밀번호가 일치하지 않습니다.")
        } else if(userId !== mockDatabaseUserInfo.user_id && (password === mockDatabaseUserInfo.user_password || password !== mockDatabaseUserInfo.user_password)){ // 비밀번호의 일치 여부에 상관 없이 아이디가 일치하지 않을 때
            Alert.alert("아이디를 잘못 입력하셨습니다.")
        } else{
            Alert.alert("로그인 정보가 일치하지 않습니다.")
        }
    };
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>로그인</Text>
            <TextInput
                style = {styles.input}
                placeholder = "아이디 입력"
                onChangeText = {text => setUserId(text)}
                value = {userId}
            >
            </TextInput>
            <TextInput
                style = {styles.input}
                placeholder = "비밀번호 입력"
                onChangeText = {text => setPassword(text)}
                value = {password}
                secureTextEntry = {true}
            >
            </TextInput>
            <TouchableOpacity style = {styles.button} onPress = {handleLogin}>
                <Text style = {styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            {errorMessage !== '' && <Text style = {styles.error}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#fff',
    },
    title : {
        fontSize : 24,
        fontWeight : 'bold',
        marginBottom : 20,
    },
    input : {
        width : '80%',
        height : 40,
        borderColor : 'gray',
        borderWidth : 1,
        borderRadius : 5,
        marginBottom : 10,
        paddingLeft : 10,
    },
    button : {
        backgroundColor : 'blue',
        width : '80%',
        height : 40,
        borderRadius : 5,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 10,
    },
    buttonText : {
        color : 'white',
        fontSize : 16,
    },
    error : {
        marginTop : 10,
    },
});

export default Login