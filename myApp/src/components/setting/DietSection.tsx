import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from '../../components/ui/ToggleSwitch';
import AppTitle from '../ui/AppTitle';
import AppText from '../ui/AppText';

export default function DietSection({ diet, onToggle, options }: any) {
  return (
    <>
      <AppTitle>Diet</AppTitle>

      {options.map((opt: any) => (
        <View
          key={opt.key}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <AppText style={{ color: '#fff' }}>{opt.label}</AppText>
          <ToggleSwitch
            active={diet[opt.key]}
            onPress={() => onToggle(opt.key)}
          />
        </View>
      ))}
    </>
  );
}
