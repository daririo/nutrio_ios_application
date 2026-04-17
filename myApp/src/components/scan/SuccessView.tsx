import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RegularButton from '../ui/RegularButton';

type Props = {
  product: any;
  onAdd: () => void;
  onRescan: () => void;
};

export default function SuccessView({ product, onAdd, onRescan }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product found</Text>

      <RegularButton label="Add to Stack" onPress={onAdd} />
      <RegularButton label="Scan again" onPress={onRescan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 10,
  },
});