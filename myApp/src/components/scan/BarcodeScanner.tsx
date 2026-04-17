import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

type Props = {
  onScan: (barcode: string) => void;
};

export default function BarcodeScanner({ onScan }: Props) {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <CameraView
        facing='back'
        autofocus='on'
        barcodeScannerSettings={{ barcodeTypes: ['ean13'] }}
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={(result) => {
          if (result?.data) {
            onScan(result.data);
          }
        }}
      />
    </View>
  );
}
