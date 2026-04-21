import React, { useState } from 'react';
import { Settings, View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

import { useBarcodeScan } from '../hooks/useBarcodeScan';
import { getProductFromBarcode, saveProduct } from '../services/productService';
import BarcodeScanner from '../components/scan/BarcodeScanner';
import RegularButton from '../components/ui/RegularButton';
import ScanLoader from '../components/scan/LoadingView';
import SuccessView from '../components/scan/SuccessView';
import ErrorView from '../components/scan/ErrorView';
import { useNavigation } from '@react-navigation/native';
import { Products } from '../types/Products';
import { getProducts, getSettings } from '../api/backend-client';
import { checkCompability } from '../services/productCompatibilityAlgorithm';
import { CompatibilityStatus, ScanPhase } from '../types/constants';
import { TabNav } from '../navigation/BottomTabs';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [phase, setPhase] = useState<ScanPhase>('scan');
  const [product, setProduct] = useState<Products | null>(null);

  const [isCompatible, setIsCompatible] =
    useState<CompatibilityStatus>('compatible');

  const navigation = useNavigation<TabNav>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetFlow();
    });

    return unsubscribe;
  }, [navigation]);

  const handleScan = async (barcode: string) => {
    setPhase('loading');

    const start = Date.now();
    const MIN_LOADING_TIME = 500;

    try {
      const existingProducts = await getProducts();
      const settings = await getSettings();
      const result = await getProductFromBarcode(barcode);

      const exists = existingProducts.some(
        (element: Products) => Number(element.id) === Number(barcode)
      );
      if (!exists) {
        if (result && checkCompability(result, settings)) {
          setIsCompatible('compatible');
        } else {
          setIsCompatible('not-compatible');
        }
      } else {
        setIsCompatible('exist');
      }

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

  const addProductToStack = async () => {
    if (!product) return;
    await saveProduct(product);
    navigation.navigate('Stack');
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
        <RegularButton
          label='Grant Camera Permission'
          onPress={requestPermission}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {phase === 'scan' && <BarcodeScanner onScan={triggerScan} />}

      {phase === 'loading' && <ScanLoader />}

      {phase === 'success' && product && (
        <SuccessView
          product={product}
          status={isCompatible}
          onAdd={addProductToStack}
          onRescan={resetFlow}
        />
      )}

      {phase === 'error'  && <ErrorView onRescan={resetFlow} />}
    </View>
  );
}
