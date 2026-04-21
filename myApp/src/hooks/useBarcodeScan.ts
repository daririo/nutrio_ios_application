import { useRef } from 'react';

export function useBarcodeScan(onScan: (data: any) => Promise<void>) {
  const scanLockRef = useRef(false);
  const lastScanRef = useRef(0);

  const triggerScan = async (data: any) => {
    const now = Date.now();

    if (scanLockRef.current || now - lastScanRef.current < 2000) {
      return;
    }

    lastScanRef.current = now;
    scanLockRef.current = true;

    try {
      await onScan(data);
    } finally {
      setTimeout(() => {
        scanLockRef.current = false;
      }, 1000);
    }
  };

  const resetLock = () => {
    scanLockRef.current = true;

    setTimeout(() => {
      scanLockRef.current = false;
    }, 1000);
  };

  return {
    triggerScan,
    resetLock,
  };
}
