import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './TabNavigator'
import Ionicons from 'react-native-vector-icons';
import ProfileStack from '../screens/MyProfile';

// Screens
import LoginScreen from '../screens/LoginScreen';
import Main from '../screens/Main';
import AddBook from '../screens/AddBook';
import MyProfile from '../screens/MyProfile';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerTitle: "Chapter Cache",
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#F06E1D" },
  headerTintColor: "white",
};

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerBackVisible: false }} />
      <Stack.Screen name="Add Book" component={AddBook} />
    </Stack.Navigator>
  );
}

export default Navigation;
