import {useState} from "react"
import {View, Text, TextInput, Button, StyleSheet} from "react-native"
import axios from "axios"
import { isContentEditable } from "@testing-library/user-event/dist/utils"

const Signup = () => {
    const [userId, setUserId] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordConfirm, setUserPasswordComrifm] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [authCode, setAuthCode] = useState("")
    const [generatedCode, setGeneratedCode] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isIdChecked, setIsIdChecked] = useState(false)

    const handleSentAuthCode = async () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        setGeneratedCode(code)
        setIsCodeSent(true)
        await axios.post("http://smtp.naver.com/api/send-email", {userEmail, code})
    }
    
    const handleUserIdDuplicate = async () => {
        const response = await axios.post("http://smtp.naver.com/api/check-id", {userId})
        if(response.data.exists) {
            alert("중복된 아이디입니다.")
        } else{
            alert("사용 가능한 아이디입니다.")
            setIsIdChecked(true)
        }
    }

    const handleSignup = () => {
        if(authCode !== generatedCode){
            alert("인증번호가 일치하지 않습니다.")
            return
        }
        // 회원가입 로직 추가
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>회원가입</Text>
            <Text>아이디</Text>
            <TextInput
                style = {styles.input}
                value = {userId}
                onChangeText = {setUserId}
            />
            <Button
                title = "중복확인"
                onPress = {handleUserIdDuplicate}
            />
            <Text>비밀번호</Text>
            <TextInput
                style = {styles.input}
                secureTextEntry = {true}
                value = {userPassword}
                onChangeText = {setUserPassword}
            />
            <Text>비밀번호 재입력</Text>
            <TextInput
                style = {styles.input}
                secureTextEntry = {true}
                value = {userPasswordConfirm}
                onChangeText = {setUserPasswordComrifm}
            />
            <Text>이메일</Text>
            <TextInput
                style = {styles.input}
                value = {userEmail}
                onChangeText = {setUserEmail}
            />
            <Button
                title = "인증번호 발송"
                onPress = {handleSendAuthCode}
            />
            {isCodeSent && (
                <View>
                    <Text>인증번호</Text>
                    <TextInput
                        style = {styles.input}
                        value = {authCode}
                        onChangeText = {setAuthCode}
                    />
                    <Button
                        title = "인증하기"
                        onPress = {handleSignup}
                    />
                </View>
            )}
            <Button
                titlte = "회원가입"
                onPress = {handleSignup}
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
})

export default Signup