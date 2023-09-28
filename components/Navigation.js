import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Main from "../screens/Main";
import AddBook from "../screens/AddBook";
import CreateAccount from '../screens/CreateAccount';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
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
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}} />
          <Stack.Screen name="Main" component={Main} options={{ headerBackVisible: false }} />
          <Stack.Screen name="Add Book" component={AddBook} />

        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
