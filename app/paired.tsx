import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useRouter } from 'expo-router';

export default function PairedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut autoStart />
      <Text style={styles.message}>🎉 Congratulations! Your device has been successfully paired and is ready to use.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#023c69',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Nunito-Bold',
  },
  button: {
    backgroundColor: '#023c69',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
});
