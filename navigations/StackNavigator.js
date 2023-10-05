import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Main from "../screens/Main";
import AddBook from "../screens/AddBook";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerTitle: "Chapter Cache",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#F06E1D" },
        headerTintColor: "white"
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
          <Stack.Screen name="Main" component={Main} options={{ headerBackVisible: false }} />
          <Stack.Screen name="Add Book" component={AddBook} />
        </Stack.Group>
      </Stack.Navigator>
  );
};

export default MainStackNavigator;
