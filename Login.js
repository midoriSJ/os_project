import { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native"

const Login = ({navigation}) => {
    const [userId, setUserId] = useState("")
    const [userPassword, setUserPassword] = useState("")

    // 로그인 함수
    const handleLogin = () => {
        
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>로그인</Text>
            <Text>아이디</Text>
            <TextInput
                style = {styles.input}
                placeholder = "아이디를 입력하세요"
                value = {userId}
                onChangeText = {setUserId}
            />
            <Text>비밀번호</Text>
            <TextInput
                style = {styles.input}
                placeholder = "비밀번호를 입력하세요"
                secureTextEntry = {true}
                value = {userPassword}
                onChangeText = {setUserPassword}
            />
            <Button 
                title = "로그인" 
                onPress = {handleLogin}
            />
            <View style = {styles.space}/>
            <Button
                title = "회원가입"
                onPress = {() => navigation.navigate("Signup")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        padding : 20,
    },
    title : {
        fontSize : 24,
        marginBottom : 20,
        textAlign : "center",
    },
    input : {
        height : 40,
        borderColor : "gray",
        borderWidth : 1,
        marginBottom : 20,
        paddingHorizontal : 10,
    },
    space : {
        height : 20,
    }
})

export default Login