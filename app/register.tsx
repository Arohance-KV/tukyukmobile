import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { completeProfile } from './redux/otpSlice'; // Adjust path if needed
import type { RootState, AppDispatch } from './redux/store';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState(''); // ✅ renamed

  const { tempToken, error: otpError } = useSelector((state: RootState) => state.otp);
  const { accessToken, error: authError } = useSelector((state: RootState) => state.auth);
  
  const handleSubmit = async () => {
    if (!firstName || !lastName || !vehicleNumber) {
      Alert.alert('All fields are required');
      return;
    }

    try {
      await dispatch(completeProfile({ firstName, lastName, vehicleNumber })).unwrap(); // ✅ updated key
      router.push('/home');
    } catch (err: any) {
      Alert.alert('Profile Error', err || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <View style={styles.arrowContainer}>
          <View style={styles.arrowHead} />
        </View>
      </TouchableOpacity>

      <Text style={styles.header}>
        <Text style={styles.highlight}>WELCOME! </Text>
      </Text>

      <View style={styles.spacingBelowHeader} />

      <TextInput
        placeholder="First Name"
        placeholderTextColor="#666"
        style={styles.inputFull}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#666"
        style={styles.inputFull}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Vehicle Number"
        placeholderTextColor="#666"
        style={styles.inputFull}
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
      /> {/* ✅ updated placeholder and logic */}

      <View style={styles.spacingBelowForm} />
      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: '#f8f6f3',
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 15,
    padding: 8,
    zIndex: 10,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowHead: {
    width: 12,
    height: 12,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: 'black',
    transform: [{ rotate: '-45deg' }],
  },
  header: {
    fontSize: 35,
    fontWeight: '700',
    marginTop: 60,
    marginBottom: 15,
    fontFamily: 'Nunito-Bold',
  },
  highlight: {
    color: '#FFB800',
    fontFamily: 'Nunito-Bold',
    fontSize: 35,
  },
  spacingBelowHeader: {
    height: 100,
  },
  inputFull: {
    backgroundColor: '#eee',
    color: '#000',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Nunito',
  },
  spacingBelowForm: {
    height: 80,
  },
  nextButton: {
    backgroundColor: '#000',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  nextText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
  },
});
