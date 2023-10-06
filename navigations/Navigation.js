import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "react-native-vector-icons";
import BottomTabNavigator from './TabNavigator'
import LoginScreen from '../screens/LoginScreen';
import AddBook from "../screens/AddBook";
import CreateAccount from '../screens/CreateAccount';
import BookInfo from '../screens/BookInfo';

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
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{
            title: 'Chapter Cache', headerBackVisible: false, headerRight: () => {
              const navigation = useNavigation();
              return (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ paddingHorizontal: 5 }}>Sign Out</Text>
                  <FontAwesome style={{ paddingHorizontal: 5 }}
                    name="sign-out"
                    size={25}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}
                  />
                </View>
              );
            },
          }}
          />
          <Stack.Screen name="Add Book" component={AddBook} options={{ title: 'Add a Book' }} />
          <Stack.Screen name="Book Info" component={BookInfo} options={{ title: 'Book Info' }} />


        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
