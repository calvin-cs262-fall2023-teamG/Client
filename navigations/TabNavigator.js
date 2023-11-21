/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from 'react-native-vector-icons';

// screens to be used in the Main page's tabs
import MyProfile from '../screens/MyProfile'; // The profile details
import Main from '../screens/Main'; // The main page

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      {/* Creates the tabs to be used on the page */}
      <Tab.Screen name="Home" component={Main} options={{ headerShown: false, tabBarActiveTintColor: '#000000', tabBarIcon: ({ size, focused }) => (<FontAwesome name="home" color={focused ? '#3beec2' : '#b0f8e7'} size={size} />) }} />
      <Tab.Screen name="My Profile" component={MyProfile} options={{ headerShown: false, tabBarActiveTintColor: '#000000', tabBarIcon: ({ size, focused }) => (<FontAwesome name="user" color={focused ? '#3beec2' : '#b0f8e7'} size={size} />) }} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
