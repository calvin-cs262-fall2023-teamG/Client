import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}