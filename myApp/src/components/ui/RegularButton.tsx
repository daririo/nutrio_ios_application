import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Button({ label: title, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 87,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4379A6',
  },

  text: {
    color: '#fff',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.3
  }
});
