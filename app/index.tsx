import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        router.replace('/home'); // ✅ Redirect if already logged in
      } else {
        setCheckingAuth(false); // Show login/register screen
      }
    };
    checkAccessToken();
  }, []);

  if (checkingAuth) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4B6EF6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./tuk.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.titleYellow}>TUK</Text>
          <Text style={styles.titleBlack}>TUK ADS</Text>
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/newRegister')}>
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f3',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 400,
  },
  content: {
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 52,
    fontFamily: 'Nunito',
    fontWeight: '700',
    lineHeight: 52,
    letterSpacing: 0,
    marginBottom: 30,
  },
  titleYellow: {
    color: '#FFB800',
  },
  titleBlack: {
    color: '#000',
  },
  loginButton: {
    width: 200,
    height: 61,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  registerButton: {
    width: 200,
    height: 61,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
});
