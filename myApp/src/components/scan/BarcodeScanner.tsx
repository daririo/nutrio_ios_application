import React from 'react';
import { StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

type Props = {
  onScan: (barcode: string) => void;
};

export default function BarcodeScanner({ onScan }: Props) {
  return (
      <CameraView
        facing='back'
        autofocus='on'
        barcodeScannerSettings={{ barcodeTypes: ['ean13'] }}
        style={styles.camera}
        onBarcodeScanned={(result) => {
          if (result?.data) {
            onScan(result.data);
          }
        }}
      />
  );
}

const styles = StyleSheet.create({
  camera: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});