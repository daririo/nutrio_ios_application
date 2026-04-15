import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import SettingScreen from '../screens/SettingScreen';
import StackScreen from '../screens/StackScreen';
import ScanScreen from '../screens/ScanScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,

        headerStyle: {
          backgroundColor: '#B7D1E6',
          height: 120,
        },

        headerTitleStyle: {
          fontFamily: 'JustAnotherHand',
          fontSize: 32,
          color: '#111111',
        },

        headerTitleAlign: 'center',

        tabBarStyle: {
          backgroundColor: '#B7D1E6',
          borderTopWidth: 0,
          height: 70,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name='Stack'
        component={StackScreen}
        options={{
          title: 'My products',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarIconStyle,
                {
                  backgroundColor: focused ? '#B7D1E6' : 'transparent',
                  transform: focused ? [{ translateY: -28 }] : [],
                },
              ]}
            >
              <Ionicons name='layers' size={36} color='#111' />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Scan'
        component={ScanScreen}
        options={{
          title: 'Scan product',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarIconStyle,
                {
                  backgroundColor: focused ? '#B7D1E6' : 'transparent',
                  transform: focused ? [{ translateY: -28 }] : [],
                },
              ]}
            >
              <Ionicons name='scan' size={36} color='#111' />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Setting'
        component={SettingScreen}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabBarIconStyle,
                {
                  backgroundColor: focused ? '#B7D1E6' : 'transparent',
                  transform: focused ? [{ translateY: -28 }] : [],
                },
              ]}
            >
              <Ionicons name='settings' size={36} color='#111' />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIconStyle: {
    top: 12,
    width: 100,
    height: 60,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
