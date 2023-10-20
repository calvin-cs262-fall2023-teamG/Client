import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import BottomTabNavigator from './TabNavigator'
import LoginScreen from '../screens/LoginScreen';
import AddBook from "../screens/AddBook";
import CreateAccount from '../screens/CreateAccount';
import BookInfo from '../screens/BookInfo';
import ContactInfo from '../screens/ContactInfo';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createNativeStackNavigator();
 
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#000000',
        headerStyle: {
          backgroundColor: '#81F4D8'
        }
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
                fontWeight: 'bold',
              },
            }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false}} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{
            title: '', headerBackVisible: false, headerLeft:()=>{
              const navigation = useNavigation();

              return(
              <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{ flexDirection: "row" }}>
                <Icon style={{ paddingHorizontal: 5, color: '#888181' }} name="book" size={20} />
                <Text style={{ paddingHorizontal: 5, color: '#888181' }}>Chapter Cache</Text>
              </TouchableOpacity>)
            },
            headerRight: () => {
              const navigation = useNavigation();
              return (                
                  <TouchableOpacity onPress={() => {
                  navigation.navigate('Login');
                }} style={{ flexDirection: "row" }} >
                  <Text style={{ paddingHorizontal: 5, color: '#888181'}}>Sign Out</Text>
                  <Icon style={{ paddingHorizontal: 5, color: '#888181'}}
                    name="sign-out"
                    size={20}
                    
                  />
                  </TouchableOpacity>
              );
            },
          }}
          />
          <Stack.Screen name="Add Book" component={AddBook} options={{ title: 'Add a Book' }} />
          <Stack.Screen name="Book Info" component={BookInfo} options={{ title: 'Book Info' }} />
          <Stack.Screen name="Add Book Contact Info" component={ContactInfo} options={{title:'Contact Info'}}/>
          
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
