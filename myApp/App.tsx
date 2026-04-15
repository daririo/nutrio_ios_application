import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    JustAnotherHand: require('./src/assets/fonts/JustAnotherHand-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}