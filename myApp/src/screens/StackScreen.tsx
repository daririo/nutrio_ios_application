import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { Products } from '../types/Products';
import { deleteProduct, getProducts } from '../services/backend-client';
import AppText from '../components/AppText';
import AppTitle from '../components/AppTitle';
import NutritionTable from '../components/NutritionTable';
import RegularButton from '../components/RegularButton';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function StackScreen() {
  const [selectedItem, setSelectedItem] = useState<Products | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Products | null>(null);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
  const closeDeleteMode = () => {
    setItemToDelete(null);
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size='large' />}
      {products && !loading && (
        <FlatList
          data={products}
          refreshing={refreshing}
          onRefresh={onRefresh}
          numColumns={2}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Pressable
                onLongPress={() => setItemToDelete(item)}
                onPress={() => setSelectedItem(item)}
              >
                <Image source={{ uri: item.image_url }} style={styles.image} />
              </Pressable>
            </View>
          )}
        />
      )}
      {selectedItem && (
        <Pressable style={styles.overlay} onPress={() => setSelectedItem(null)}>
          <View style={styles.popup}>
            <AppTitle>{selectedItem.name}</AppTitle>
            <NutritionTable
              macros={selectedItem.macros}
              micros={selectedItem?.micros}
              vitamins={selectedItem?.vitamins}
            />
          </View>
        </Pressable>
      )}
      {itemToDelete && (
        <Pressable style={styles.overlay} onPress={closeDeleteMode}>
          <View>
            <RegularButton
              label='delete'
              onPress={() => handleDelete(itemToDelete.id)}
            ></RegularButton>
          </View>
        </Pressable>
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
  list: {
    paddingVertical: 24,
  },
  row: {
    justifyContent: 'flex-start',
  },
  card: {
    width: 172,
    margin: 5,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
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
    flex: 1,
    margin: 34,
    marginBottom: 174,
    width: 340,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#BDBDBD',
    backgroundColor: '#111',
  },
});
