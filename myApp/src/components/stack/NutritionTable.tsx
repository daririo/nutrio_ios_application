import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../ui/AppText';
import { Macros, Micros, Vitamins } from '../../types/Products';

type Props = {
  macros?: Macros;
  micros?: Micros;
  vitamins?: Vitamins;
};

const format = (v?: number) => (v != null ? v.toFixed(1) : '-');

const toRows = (obj?: Micros | Vitamins) => {
  if (!obj) return [];

  return Object.entries(obj).filter(([key, value]) => {
    return key !== 'id' && (value ?? 0) > 0;
  }) as [string, number | undefined][];
};

const NutritionTable: React.FC<Props> = ({ macros, micros, vitamins }) => {
  const macroRows = [
    ['Calories', format(macros?.kcal)],
    ['Protein', macros?.protein],
    ['Fat', macros?.fat],
    ['Fiber', macros?.fiber],
    ['Sugar', macros?.sugar],
  ] as const;

  const sections = [
    { title: 'Micros', data: micros },
    { title: 'Vitamins', data: vitamins },
  ];

  return (
    <View>
      <View style={styles.table}>
        <AppText style={styles.title}>Macros</AppText>
        {macroRows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <AppText style={styles.label}>{label}</AppText>
            <AppText style={styles.value}>{value}</AppText>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {sections.map((section) => {
          const rows = toRows(section.data);

          if (rows.length === 0) return null;

          return (
            <View key={section.title} style={styles.column}>
              <AppText style={styles.title}>{section.title}</AppText>

              {rows.map(([name]) => (
                <View key={name} style={styles.gridRow}>
                  <AppText style={styles.label}>{name}</AppText>
                  <AppText style={styles.icon}>✓</AppText>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default NutritionTable;

const styles = StyleSheet.create({
  table: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  value: {
    width: 80,
    textAlign: 'right',
  },

  grid: {
    flexDirection: 'row',
    marginTop: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 6,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 12,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    flex: 1,
  },
  icon: {
    width: 16,
    textAlign: 'right',
  },
});
