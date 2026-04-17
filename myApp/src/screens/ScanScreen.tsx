import React, { useState } from 'react';
import { View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';


import { useBarcodeScan } from '../hooks/useBarcodeScan';
import { getProductFromBarcode, saveProduct } from '../services/productService';
import BarcodeScanner from '../components/scan/BarcodeScanner';
import RegularButton from '../components/ui/RegularButton';
import ScanLoader from '../components/scan/LoadingView';
import SuccessView from '../components/scan/SuccessView';
import ErrorView from '../components/scan/ErrorView';

type Phase = 'scan' | 'loading' | 'success' | 'error';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [phase, setPhase] = useState<Phase>('scan');
  const [product, setProduct] = useState<any>(null);

  const handleScan = async (barcode: string) => {
    setPhase('loading');

    const start = Date.now();
    const MIN_LOADING_TIME = 500;

    try {
      const result = await getProductFromBarcode(barcode);

      const delay = Math.max(0, MIN_LOADING_TIME - (Date.now() - start));

      setTimeout(() => {
        if (result) {
          setProduct(result);
          setPhase('success');
        } else {
          setPhase('error');
        }
      }, delay);
    } catch {
      setPhase('error');
    }
  };

  const { triggerScan, resetLock } = useBarcodeScan(handleScan);

  const handleAdd = async () => {
    if (!product) return;
    await saveProduct(product);
    resetFlow();
  };

  const resetFlow = () => {
    setProduct(null);
    setPhase('scan');
    resetLock();
  };

  if (!permission) {
    return <ScanLoader />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RegularButton label="Grant Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' }}>
      {phase === 'scan' && (
        <BarcodeScanner onScan={triggerScan} />
      )}

      {phase === 'loading' && <ScanLoader />}

      {phase === 'success' && product && (
        <SuccessView
          product={product}
          onAdd={handleAdd}
          onRescan={resetFlow}
        />
      )}

      {phase === 'error' && (
        <ErrorView onRescan={resetFlow} />
      )}
    </View>
  );
}