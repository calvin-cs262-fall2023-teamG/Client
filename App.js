import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import Navigation from './navigations/Navigation';

function App() {
  // FOR PRESETATION PURPOSES
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();// Ignore all log notifications
  return (
    <Navigation>
      <StatusBar hidden />
    </Navigation>
  );
}

export default App;
