import React from 'react';
import { View } from 'react-native';
import ToggleButton from '../../components/ui/ToggleButton';
import AppTitle from '../ui/AppTitle';

export default function NutritionSection({
  nutrients,
  onToggle,
  options,
}: any) {
  return (
    <>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {options.map((n: string) => (
          <ToggleButton
            key={n}
            label={n}
            active={nutrients.includes(n)}
            onPress={() => onToggle(n)}
          />
        ))}
      </View>
    </>
  );
}