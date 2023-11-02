import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigations/Navigation';
import Animated, {SlideInDown, SlideInUp} from 'react-native-reanimated';

const App = () => {
  return (
    <Navigation> //The Navigation element provides all the controls for accessing app pages.
      <StatusBar hidden={true} />
    </Navigation>
  );
}

export default App;

