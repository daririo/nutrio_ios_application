import React from 'react';
import { View } from 'react-native';
import ToggleButton from '../../components/ui/ToggleButton';

export default function GoalSection({
  goal,
  onChange,
  options,
}: {
  goal: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {options.map((option) => (
          <ToggleButton
            key={option}
            label={option}
            active={goal === option}
            onPress={() => onChange(option)}
          />
        ))}
      </View>
    </>
  );
}
