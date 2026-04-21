import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export default function ToggleButton({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, active ? styles.active : styles.inactive]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 80,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  active: {
    backgroundColor: 'rgb(29, 67, 101, 0.8)',
  },

  inactive: {
    backgroundColor: '#323232',
  },

  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
