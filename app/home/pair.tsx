import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRScanner from '../components/QRScanner';

export default function PairDeviceScreen() {
  const [scannerVisible, setScannerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan to pair with Device</Text>
      <Text style={styles.subtitle}>TUKTUK ADS</Text>

      <TouchableOpacity
      style={styles.scanButton}
      onPress={() => setScannerVisible(true)}
      >
        <Ionicons name="qr-code" size={64} color="white" />
      </TouchableOpacity>
      <Modal visible={scannerVisible} animationType="slide">
        <QRScanner onClose={() => setScannerVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scanButton: {
    backgroundColor: '#333',
    padding: 40,
    borderRadius: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 8,
  },
});
