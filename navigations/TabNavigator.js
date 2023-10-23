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
      <Tab.Screen name="Home" component={Main} options={{ headerShown: false, tabBarActiveTintColor: '#81F4D8', tabBarIcon: ({color, size, focused}) => (<FontAwesome name="home" color={focused ? '#81F4D8' : '#D9FFF6'} size={size} />), }} />
      <Tab.Screen name="My Profile" component={MyProfile} options={{ headerShown: false, tabBarActiveTintColor: '#81F4D8', tabBarIcon: ({ color, size, focused }) => (<FontAwesome name="user" color={focused ? '#81F4D8' : '#D9FFF6'} size={size} />), }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;