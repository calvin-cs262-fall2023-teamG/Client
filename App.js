import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigations/Navigation';

const App = () => {
  StatusBar.setTranslucent(true); //This only works on ANDROID and not Apple!
  return (
    <Navigation/> //The Navigation element provides all the controls for accessing app pages.
  );
}

export default App;

