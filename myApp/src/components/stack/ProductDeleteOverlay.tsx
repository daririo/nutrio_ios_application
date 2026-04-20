import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import { Products } from '../../types/Products';
import RegularButton from '../ui/RegularButton';

type Props = {
  product: Products;
  onDelete: (id: number) => void;
  onClose: () => void;
};

export default function ProductDeleteOverlay({
  product,
  onDelete,
  onClose,
}: Props) {
  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View>
        <RegularButton label='delete' onPress={() => onDelete(product.id)} />
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
});
