import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Products } from '../../types/Products';

type Props = {
  item: Products;
  onPress: () => void;
  onLongPress: () => void;
  isDimmed?: boolean;
};

export default function ProductCard({
  item,
  onPress,
  onLongPress,
  isDimmed = false,
}: Props) {
  return (
    <View style={[styles.card, isDimmed && styles.dimmed]}>
      <Pressable onPress={onPress} onLongPress={onLongPress}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 220,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dimmed: {
    opacity: 0.3,
  },
});
