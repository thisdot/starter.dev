import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  return (
    <View>
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}
