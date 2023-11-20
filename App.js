import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigations/Navigation';

function App() {
  return (
    <Navigation>
      <StatusBar hidden />
    </Navigation>
  );
}

export default App;
