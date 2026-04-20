import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import RegularButton from '../ui/RegularButton';
import { Products } from '../../types/Products';
import AppTitle from '../ui/AppTitle';

type Props = {
  product: Products;
  status: string;
  onAdd: () => void;
  onRescan: () => void;
};

export default function SuccessView({ product, onAdd, onRescan, status }: Props) {
  return (
    <View style={styles.container}>
        <AppTitle>{status}</AppTitle>
      <Image source={{ uri: product.image_url }} style={styles.image} />

      {product && (
        <View style={styles.bottom}>
          <View style={styles.buttonRow}>
            <RegularButton label='Add' onPress={onAdd} disabled={status === 'exist'}/>
            <RegularButton label='Scan again' onPress={onRescan} />
          </View>
        </View>
      )}
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
  bottom: {
    padding: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
    paddingBottom: 100,
  },
});
