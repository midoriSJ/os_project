import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/bowFactory/HomeScreen';
import BowFactoryScreen from './screens/bowFactory/BowFactoryScreen';
import BoardScreen from './screens/post/BoardScreen';
import MyPageScreen from './screens/userInfo/MyPageScreen';
import SelectBowFactoryScreen from './screens/bowFactory/SelectBowFactoryScreen';
import SignupScreen from './screens/userInfo/SignupScreen';
import LoginScreen from './screens/userInfo/LoginScreen';
import AgreementScreen from './screens/userInfo/AgreementScreen';
import FirstBowFactoryInfoScreen from './screens/bowFactory/FirstBowFactoryInfoScreen';
import ChangeUserInfoScreen from './screens/userInfo/ChangeUserInfoScreen';
import PostDetailScreen from './screens/post/PostDetailScreen'; // 추가된 import

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="BowFactory" component={BowFactoryScreen} />
      <Tab.Screen name="Board" component={BoardScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Agreement" component={AgreementScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="SelectBowFactory" component={SelectBowFactoryScreen} />
            <Stack.Screen name="FirstBowFactoryInfo" component={FirstBowFactoryInfoScreen} />
            <Stack.Screen name="ChangeUserInfo" component={ChangeUserInfoScreen} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} /> {/* 추가된 Stack.Screen */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
