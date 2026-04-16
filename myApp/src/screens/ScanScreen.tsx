import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera';
import { fetchProductByBarcode } from '../services/openfood-api-client';
import Button from '../components/button';

type Phase = 'scan' | 'loading' | 'success' | 'error';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [phase, setPhase] = useState<Phase>('scan');
  const [product, setProduct] = useState<any>(null);


  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#323232" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Button label="Grant Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleScan = async (result: BarcodeScanningResult) => {
    if (phase !== 'scan') return;

    setPhase('loading');

    try {
      const barcode = result.data;
      const response = await fetchProductByBarcode(barcode);

      console.log('response:', response);

      if (response && response.status != 0) {
        setProduct(response);
        setPhase('success');
      } else {
        setProduct(null);
        setPhase('error');
      }
    } catch (error) {
      console.log('scan error:', error);
      setProduct(null);
      setPhase('error');
    }
  };

  console.log(phase)


  return (
    <View style={styles.container}>

      {phase === 'scan' && (
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleScan}
        />
      )}

      {phase === 'loading' && (
        <ActivityIndicator size="large" color="#323232" />
      )}

      {phase === 'success' && product && (
        <View style={styles.result}>
          <Text style={styles.text}>Product found</Text>

          <Button
            label="Scan again"
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

          <Button
            label="Scan again"
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
  camera: {
    width: '100%',
    height: '100%',
  },
  result: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  },
  errorText: {
    color: '#323232',
    fontSize: 32,
  },
});