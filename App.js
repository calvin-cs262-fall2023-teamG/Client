import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import Navigation from './navigations/Navigation';

/**
 * Handles the navigation of the app.
 * @returns navigation with a hidden statusbar.
 */
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
