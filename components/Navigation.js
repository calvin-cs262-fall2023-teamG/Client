import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
            name="Login"
            component={LoginScreen}
            options={{
                title: 'ChapterCache',
                headerShown: false,
                headerTitleStyle:{
                    fontSize: 25,
                    fontWeight :'bold'

                }}} />
        <Stack.Screen 
            name="Main" 
            component={MainScreen}
            options={{
                headerBackVisible:false
                }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
