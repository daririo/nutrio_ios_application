import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingScreen from '../screens/SettingScreen';
import StackScreen from '../screens/StackScreen';
import ScanScreen from '../screens/ScanScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Stack" component={StackScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}