import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from '../../components/ui/ToggleSwitch';
import AppText from '../ui/AppText';

export default function DietSection({ diet, onToggle, options }: any) {
  return (
    <View style={styles.container}>
      {options.map((opt: any, index: number) => (
        <View key={opt.key}>
          <View style={styles.row}>
            <AppText style={styles.label}>{opt.label}</AppText>

            <ToggleSwitch
              active={diet[opt.key]}
              onPress={() => onToggle(opt.key)}
            />
          </View>

          {index !== options.length - 1 && (
            <View style={styles.divider} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    paddingHorizontal: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },

  label: {
    color: '#fff',
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: '#323232',
  },
});