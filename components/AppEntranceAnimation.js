/* eslint-disable react/jsx-filename-extension */
import { Text } from 'react-native';
import React from 'react';
import Animated, { Keyframe } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon set you prefer

export default function AppEntranceAnimation() {
  // COMPONENT NOT IN USE, MAY BE WORKED ON IF REUSABILITY REQUIRED
  const keyframe = new Keyframe({
    0: {
      transform: [{ translateY: 0 }],
    },
    100: {
      transform: [{ translateY: 300 }],
    },
  });

  return (
    <Animated.View entering={keyframe}>
      <Icon name="book" size={50} color="#000" /* Corner logo object */ />
      <Text>Your App Title</Text>
    </Animated.View>
  );
}
