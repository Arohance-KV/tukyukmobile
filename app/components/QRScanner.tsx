import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { initiatePairing, confirmPairing, resetPairing } from '../redux/pairingSlice';
import type { AppDispatch, RootState } from '../redux/store';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const FRAME_SIZE = 250;
const router = useRouter();
export default function QRScanner({ onClose }: { onClose: () => void }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success, deviceId, sessionToken } = useSelector(
    (state: RootState) => state.pairing
  );

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  useEffect(() => {
    if (success) {
      onClose(); // Close scanner modal
      dispatch(resetPairing());
      router.replace('/paired'); // ✅ navigate to the new screen
    }

    if (error) {
      Alert.alert('❌ Pairing Failed', error, [
        {
          text: 'OK',
          onPress: () => {
            setScanned(false);
            dispatch(resetPairing());
          },
        },
      ]);
    }
  }, [success, error]);

  useEffect(() => {
    if (deviceId && sessionToken) {
      dispatch(confirmPairing({ deviceId, sessionToken }));
    }
  }, [sessionToken]); // when sessionToken is set by initiatePairing

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;

    try {
      const parsed = JSON.parse(data);
      const { _id, initialPairingToken } = parsed;

      if (!_id || !initialPairingToken) throw new Error('Invalid QR Code');

      setScanned(true);

      Alert.alert(
        'Confirm Pairing',
        `Do you want to pair this device?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setScanned(false),
          },
          {
            text: 'Pair',
            onPress: () => {
              dispatch(initiatePairing({ deviceId: _id, initialPairingToken }));
            },
          },
        ]
      );
    } catch (err) {
      Alert.alert('Invalid QR Code', 'The scanned QR is not valid.');
      setScanned(false);
    }
  };

  if (!permission?.granted) {
    return <Text style={styles.permissionText}>Requesting camera permission...</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />

     
      <BlurView intensity={0} style={[styles.blur, { top: 0, bottom: height / 2 - FRAME_SIZE / 2 }]} />
      <BlurView intensity={0} style={[styles.blur, { top: height / 2 + FRAME_SIZE / 2, bottom: 0 }]} />
      <BlurView intensity={0} style={[styles.blur, { top: height / 2 - FRAME_SIZE / 2, height: FRAME_SIZE, left: 0, right: width / 2 - FRAME_SIZE / 2 }]} />
      <BlurView intensity={0} style={[styles.blur, { top: height / 2 - FRAME_SIZE / 2, height: FRAME_SIZE, left: width / 2 + FRAME_SIZE / 2, right: 0 }]} />

      
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />

      <BlurView intensity={50} style={styles.bottomOverlay} tint="dark">
        <Text style={styles.label}>Scan to pair with Device</Text>
        <Text style={styles.subLabel}>TUKTUK ADS</Text>
        {loading && <ActivityIndicator color="#fff" style={{ marginTop: 10 }} />}
      </BlurView>

      <Pressable style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={30} color="white" />
      </Pressable>
    </View>
  );
}

const cornerSize = 40;
const cornerThickness = 4;

const styles = StyleSheet.create({
  container: { flex: 1 },
  permissionText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  blur: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Nunito',
  },
  subLabel: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Nunito',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  corner: {
    position: 'absolute',
    width: cornerSize,
    height: cornerSize,
    borderColor: '#fff',
  },
  topLeft: {
    top: height / 2 - FRAME_SIZE / 2,
    left: width / 2 - FRAME_SIZE / 2,
    borderTopWidth: cornerThickness,
    borderLeftWidth: cornerThickness,
    borderTopLeftRadius: 10,
  },
  topRight: {
    top: height / 2 - FRAME_SIZE / 2,
    left: width / 2 + FRAME_SIZE / 2 - cornerSize,
    borderTopWidth: cornerThickness,
    borderRightWidth: cornerThickness,
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    top: height / 2 + FRAME_SIZE / 2 - cornerSize,
    left: width / 2 - FRAME_SIZE / 2,
    borderBottomWidth: cornerThickness,
    borderLeftWidth: cornerThickness,
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    top: height / 2 + FRAME_SIZE / 2 - cornerSize,
    left: width / 2 + FRAME_SIZE / 2 - cornerSize,
    borderBottomWidth: cornerThickness,
    borderRightWidth: cornerThickness,
    borderBottomRightRadius: 10,
  },
});
