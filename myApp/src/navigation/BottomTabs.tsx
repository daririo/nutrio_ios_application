import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import SettingScreen from '../screens/SettingScreen';
import StackScreen from '../screens/StackScreen';
import ScanScreen from '../screens/ScanScreen';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerTransparent: true,
        headerBackground: () => (
          <BlurView intensity={20} style={{ flex: 1 }}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(169, 211, 251, 0.6)',
              }}
            />
          </BlurView>
        ),
        headerStyle: {
          backgroundColor: 'rgba(169, 211, 251, 0.6)',
          height: 120,
        },

        headerTitleStyle: {
          fontFamily: 'JustAnotherHand',
          fontSize: 32,
          color: '#111111',
        },

        headerTitleAlign: 'center',

        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 70,
          position: 'absolute',
        },

        tabBarBackground: () => (
          <BlurView intensity={20} style={{ flex: 1 }}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(169, 211, 251, 0.6)',
              }}
            />
          </BlurView>
        ),
      }}
    >
      <Tab.Screen
        name='Stack'
        component={StackScreen}
        options={{
          title: 'My products',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabBarIconStyle]}>
              <Ionicons
                name='layers'
                size={36}
                color={focused ? 'rgb(17, 17, 17)' : 'rgba(10, 10, 10, 0.2)'}
              />
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
            <View style={[styles.tabBarIconStyle]}>
              <Ionicons
                name='scan'
                size={36}
                color={focused ? 'rgb(17, 17, 17)' : 'rgba(10, 10, 10, 0.2)'}
              />
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
            <View style={[styles.tabBarIconStyle]}>
              <Ionicons
                name='settings'
                size={36}
                color={focused ? 'rgb(17, 17, 17)' : 'rgba(10, 10, 10, 0.2)'}
              />
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
