import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera';
import { fetchProductByBarcode } from '../services/openfood-api-client';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState<any>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting permission...</Text>; // ! Add Spinner as soon as ready
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        // ! Add Custom Button as soon as ready
        <Button title='Grant Camera Permission' onPress={requestPermission} />
      </View>
    );
  }

  const handleScan = async (result: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);

    const barcode = result.data;

    const response = await fetchProductByBarcode(barcode);

    console.log('response from api: ', response);
    setProduct(response);
  };

  return (
    <View style={styles.container}>
      {!scanned && (
        <CameraView style={styles.camera} onBarcodeScanned={handleScan} />
      )}

      {scanned && (
        <View>
          {product ? <Text>scanned</Text> : <Text>No product found</Text>}
          // ! Add custom Button as soon as ready
          <Button
            title='Scan again'
            onPress={() => {
              setScanned(false);
              setProduct(null);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: {
    height: '100%',
    width: '100%',
  },
});
