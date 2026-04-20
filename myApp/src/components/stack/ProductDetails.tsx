import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import { Products } from '../../types/Products';
import AppTitle from '../ui/AppTitle';
import NutritionTable from './NutritionTable';

type Props = {
  product: Products;
  onClose: () => void;
};

export default function ProductDetailsModal({ product, onClose }: Props) {
  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.popup}>
        <AppTitle>{product.name}</AppTitle>

        <NutritionTable
          macros={product.macros}
          micros={product.micros}
          vitamins={product.vitamins}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 340,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: '#111',
  },
});
