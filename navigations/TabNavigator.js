import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "react-native-vector-icons";

// screens
import MyProfile from "../screens/MyProfile";
import Main from "../screens/Main";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} options={{ headerShown: false, tabBarActiveTintColor: '#81F4D8', tabBarIcon: ({color, size, tabBarIcon}) => (<FontAwesome name="home" color='#81F4D8' size={size} />), }} />
      <Tab.Screen name="My Profile" component={MyProfile} options={{ headerShown: false, tabBarActiveTintColor: '#81F4D8', tabBarIcon: ({ color, size }) => (<FontAwesome name="user" color='#81F4D8' size={size} />), }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;