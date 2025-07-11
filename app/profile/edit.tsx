import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../redux/authSlice'; // 👈 make sure this is imported
import type { RootState, AppDispatch } from '../redux/store';

export default function EditProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Populate local state once profile is loaded
  useEffect(() => {
    if (user) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      setUsername(fullName);
      setPhone(user.phoneNumber || '');
      setVehicleNumber(user.vehicleNumber || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    const nameParts = username.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    try {
      await dispatch(
        updateProfile({
          firstName,
          lastName,
          phoneNumber: phone,
          vehicleNumber,
        })
      ).unwrap();

      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err || 'Update failed');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <AntDesign name="sharealt" size={20} color="white" />
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image source={require('../profile.jpg')} style={styles.profileImage} />
        <Text style={styles.changePictureText}>Change Picture</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Vehicle Number</Text>
        <TextInput
          style={styles.input}
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={loading}>
        <Text style={styles.updateButtonText}>{loading ? 'Updating...' : 'Update'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
  },
  header: {
    backgroundColor: '#4B6EF6',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -70,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
  },
  changePictureText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Nunito',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
    marginTop: 12,
    fontFamily: 'Nunito-Bold',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    fontFamily: 'Nunito',
  },
  updateButton: {
    backgroundColor: '#111',
    margin: 20,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});
