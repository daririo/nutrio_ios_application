import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { useFonts } from 'expo-font';
import { View } from 'react-native';

export default function App() {
  const [loaded] = useFonts({
    JustAnotherHand: require('./src/assets/fonts/JustAnotherHand-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: '#111'}}>
      <BottomTabs />
      </View>
    </NavigationContainer>
  );
}