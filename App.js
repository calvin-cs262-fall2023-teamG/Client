import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigations/Navigation';

const App = () => {
  return (
    <Navigation> //The Navigation element provides all the controls for accessing app pages.
      <StatusBar hidden={true} />
    </Navigation>
  );
}

export default App;

