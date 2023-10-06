import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import MyProfile from "../screens/MyProfile";
import Main from "../screens/Main";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} options={{headerShown: false}}/>
      <Tab.Screen name="My Profile" component={MyProfile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;