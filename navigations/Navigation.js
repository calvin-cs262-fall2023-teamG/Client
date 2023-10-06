import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from "react-native-vector-icons";
import BottomTabNavigator from './TabNavigator'
import LoginScreen from '../screens/LoginScreen';
import AddBook from "../screens/AddBook";
import CreateAccount from '../screens/CreateAccount';
import BookInfo from '../screens/BookInfo';
import ContactInfo from '../screens/ContactInfo';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
      }}>
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'ChapterCache',
              headerShown: false,
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold'
              }
            }} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}} />
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{ 
            title: 'Chapter Cache', headerRight: () => <FontAwesome name="sign-out" />, 
            headerBackVisible: false }} />
          <Stack.Screen name="Add Book" component={AddBook} options={{title:'Add a Book'}}/>
          <Stack.Screen name="Add Book Contact Info" component={ContactInfo} options={{title:'Contact Info'}}/>
          <Stack.Screen name="Book Info" component={BookInfo} options={{title:'Book Info'}}/>


        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
