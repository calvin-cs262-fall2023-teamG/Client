import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer
import BottomTabNavigator from './TabNavigator'
import LoginScreen from '../screens/LoginScreen';         // This line down imports screens the app will use
import AddBook from "../screens/AddBook";
import CreateAccount from '../screens/CreateAccount';
import BookInfo from '../screens/BookInfo';
import ContactInfo from '../screens/ContactInfo';
import ForgotPassword from '../screens/ForgotPassword';
import AddBookHelp from '../screens/AddBookHelp';
import Book from '../components/Book';
import BookInfoHelp from '../screens/BookInfoHelp';

const Stack = createNativeStackNavigator();    //This is the element to manage the screen displayed at a particular time
 
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{    //Begin the route at the Login screen
        headerBackTitleVisible: false,
        headerTintColor: '#000000',
        headerStyle: {
          backgroundColor: '#81F4D8'
        }
      }}>
        <Stack.Group>
          <Stack.Screen           //Define the Login screen
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
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false}} /*Define the location of the password recovery and account creation screens*/ />  
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{ //Define graphics for the Main screen
            title: '', headerBackVisible: false, headerLeft:()=>{
              const navigation = useNavigation();

              return(
              <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{ flexDirection: "row" }}>
                <Icon style={{ paddingHorizontal: 5, color: '#888181' }} name="book" size={20} /* Corner icon, clicking it should navigate to the main page */ /> 
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
                  <Icon style={{ paddingHorizontal: 5, color: '#888181'}} //Logout icon
                    name="sign-out"
                    size={20}
                    
                  />
                  </TouchableOpacity>
                  
              );
            },
          }}
          />
      
      <Stack.Screen
          name="Book Info"
          component={BookInfo}
          options={({ navigation }) => ({
            title: 'Book Info',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Book Info Help")}>
                <Text style={{ paddingHorizontal: 10, color: '#888181' }}>Help</Text>
              </TouchableOpacity>
            ),
          })}
        />
          <Stack.Screen name="Contact Info" component={ContactInfo} options={{title:'Contact Info'}}/>
          <Stack.Screen name="Add Book Help" component={AddBookHelp} options={{title:'Help'}}/>
          <Stack.Screen name="Book Info Help" component={BookInfoHelp} options={{title: 'Help'}}/>
          <Stack.Screen
          name="Add Book"
          component={AddBook}
          options={({ navigation }) => ({
            title: 'Add a Book',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Add Book Help")}>
                <Text style={{ paddingHorizontal: 10, color: '#888181' }}>Help</Text>
              </TouchableOpacity>
            ),
          })}
        />

          
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
