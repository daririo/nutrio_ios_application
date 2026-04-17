import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

import BarcodeScanner from '../components/BarcodeScanner';
import RegularButton from '../components/RegularButton';

import { fetchProductByBarcode } from '../services/openfood-api-client';
import { mapOpenFoodProduct } from '../mappers/product.mapper';
import { postProducts } from '../services/backend-client';

type Phase = 'scan' | 'loading' | 'success' | 'error';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [phase, setPhase] = useState<Phase>('scan');
  const [product, setProduct] = useState<any>(null);
  const requestIdRef = React.useRef(0);

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <RegularButton
          label='Grant Camera Permission'
          onPress={requestPermission}
        />
      </View>
    );
  }

  const handleScan = async (barcode: string) => {
    setPhase('loading');

    try {
      const response = await fetchProductByBarcode(barcode);

      if (response && response.status != 0) {
        setProduct(mapOpenFoodProduct(response));
        setPhase('success');
      } else {
        setProduct(null);
        setPhase('error');
      }
    } catch (e) {
      setProduct(null);
      setPhase('error');
    }
  };

  console.log('that is my product: ', product)

  async function addProductToStack(product: any) {
    try {
      await postProducts(product);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      {phase === 'scan' && <BarcodeScanner onScan={handleScan} />}

      {phase === 'loading' && <ActivityIndicator size='large' />}

      {phase === 'success' && product && (
        <View style={styles.result}>
          <Text style={styles.text}>Product found</Text>

          <RegularButton
            label='Add to Stack'
            onPress={() => {
              addProductToStack(product);
              setPhase('scan');
              setProduct(null);
            }}
          />

          <RegularButton
            label='Scan again'
            onPress={() => {
              setPhase('scan');
              setProduct(null);
            }}
          />
        </View>
      )}

      {phase === 'error' && (
        <View style={styles.result}>
          <Image
            source={require('../assets/png/page_not_found.png')}
            style={{ width: 140, height: 140 }}
            resizeMode='contain'
          />

          <Text style={styles.errorText}>Product not found</Text>

          <RegularButton
            label='Scan again'
            onPress={() => {
              setPhase('scan');
              setProduct(null);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  errorText: {
    color: '#323232',
    fontSize: 32,
  },
});
