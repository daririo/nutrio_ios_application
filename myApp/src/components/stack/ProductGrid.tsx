import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Products } from '../../types/Products';
import ProductCard from './ProductCard';

type Props = {
  products: Products[];
  refreshing: boolean;
  onRefresh: () => void;
  onSelect: (item: Products) => void;
  onDeleteRequest: (item: Products) => void;
  focusedItem: Products | null;
};

export default function ProductGrid({
  products,
  refreshing,
  onRefresh,
  onSelect,
  onDeleteRequest,
  focusedItem,
}: Props) {
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.name}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          onPress={() => onSelect(item)}
          onLongPress={() => onDeleteRequest(item)}
          isDimmed={focusedItem !== null && focusedItem?.id !== item.id}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 24,
  },
  row: {
    justifyContent: 'flex-start',
  },
});
