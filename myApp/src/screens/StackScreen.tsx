import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { Products } from '../types/Products';

const DATA: Products[] = [
  {
    id: 1,
    name: 'Kevin',
    image_url:
      'https://images.openfoodfacts.org/images/products/761/326/919/7447/front_fr.44.400.jpg',
  },
  {
    id: 2,
    name: 'Devin',
    image_url:
      'https://images.openfoodfacts.org/images/products/761/326/919/7447/front_fr.44.400.jpg',
  },
  {
    id: 3,
    name: 'Nevin',
    image_url:
      'https://images.openfoodfacts.org/images/products/761/326/919/7447/front_fr.44.400.jpg',
  },
  {
    id: 3,
    name: 'Levin',
    image_url:
      'https://images.openfoodfacts.org/images/products/761/326/919/7447/front_fr.44.400.jpg',
  },
];

export default function StackScreen() {
  const [selectedItem, setSelectedItem] = useState<Products | null>(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        numColumns={2}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable onPress={() => setSelectedItem(item)}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
            </Pressable>
          </View>
        )}
      />
      {selectedItem && (
        <Pressable style={styles.overlay} onPress={() => setSelectedItem(null)}>
          <View style={styles.popup}>
            // ! Add popup content later on
            <Text>{selectedItem.name}</Text>
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
    width: 164,
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
    margin: 28,
    width: 338,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#BDBDBD',
    backgroundColor: '#111',
  },
});
