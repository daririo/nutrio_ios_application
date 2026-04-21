import React, { useCallback, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Products } from '../types/Products';
import { deleteProduct, getProducts } from '../api/backend-client';

import ProductGrid from '../components/stack/ProductGrid';
import ProductDetailsModal from '../components/stack/ProductDetails';
import ProductDeleteOverlay from '../components/stack/ProductDeleteOverlay';
import { TabNav } from '../navigation/BottomTabs';

export default function StackScreen() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Products | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Products | null>(null);

  const focusedItem = selectedItem ?? itemToDelete;

  const navigation = useNavigation<TabNav>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedItem(null);
      setItemToDelete(null);
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setItemToDelete(null);
    } catch (error) {
      console.log('delete error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProductGrid
        products={products}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onSelect={setSelectedItem}
        onDeleteRequest={setItemToDelete}
        focusedItem={focusedItem}
      />

      {selectedItem && (
        <ProductDetailsModal
          product={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {itemToDelete && (
        <ProductDeleteOverlay
          product={itemToDelete}
          onDelete={handleDelete}
          onClose={() => setItemToDelete(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
});
