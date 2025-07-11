import React, { useRef, useState, useEffect } from 'react';
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
import { sendOtp, verifyOtp } from './redux/otpSlice'; // adjust path
import { RootState, AppDispatch } from './redux/store';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { tempToken, error, loading } = useSelector((state: RootState) => state.otp);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState('');
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      const phoneNumber = `+91${mobile}`;
      dispatch(verifyOtp({ mobile: phoneNumber, otp: otp.join('') }));
    }
  }, [otp]);

  // Removed auto-navigation logic

  const handleOTPChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setOtpSent(true);
    const phoneNumber = `+91${mobile}`;
    dispatch(sendOtp(phoneNumber));
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <View style={styles.arrowContainer}>
          <View style={styles.arrowHead} />
        </View>
      </TouchableOpacity>

      <Text style={styles.welcome}>
        <Text style={styles.highlight}>WELCOME! </Text>
        <Text>Glad to see you again</Text>
      </Text>

      <View style={styles.spacingBelowWelcome} />

      <TextInput
        placeholder="Enter your mobile number"
        placeholderTextColor="#666"
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, '');
          setMobile(numericText);
        }}
      />

      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={styles.otpWrapper}>
            <TextInput
              maxLength={1}
              keyboardType="numeric"
              style={styles.otpInput}
              onChangeText={(text) => handleOTPChange(text, i)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && otp[i] === '' && i > 0) {
                  inputRefs.current[i - 1]?.focus();
                }
              }}
              ref={(ref) => {
                if (ref) inputRefs.current[i] = ref;
              }}
              value={otp[i]}
            />
            <View style={styles.otpUnderline} />
          </View>
        ))}
      </View>

      {timer > 0 ? (
        <Text style={styles.timerText}>Resend in {timer}s</Text>
      ) : (
        <TouchableOpacity onPress={handleSendOtp}>
          <Text style={styles.sendOtp}>{otpSent ? 'Resend OTP' : 'Send OTP'}</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

      {/* Show Next button only when OTP is verified */}
      <TouchableOpacity
        style={[styles.nextButton, !tempToken && { opacity: 0.5 }]}
        onPress={() => {
          if (!tempToken) {
            Alert.alert('OTP not verified', 'Please enter a valid OTP before proceeding.');
          } else {
            router.push('/register');
          }
        }}
       >
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>


      <View style={styles.spacingBelowOtp} />
      <View style={styles.spacingBelowGoogle} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f6f3',
    flexGrow: 1,
    justifyContent: 'flex-start',
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
  welcome: {
    fontSize: 35,
    fontWeight: '700',
    marginTop: 60,
    marginBottom: 15,
    fontFamily: 'Nunito-Bold',
  },
  highlight: {
    color: '#FFB800',
    fontFamily: 'Nunito-Bold',
    fontSize: 60,
  },
  input: {
    backgroundColor: '#eee',
    color: '#000',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Nunito',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  otpWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  otpInput: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'Nunito-Bold',
  },
  otpUnderline: {
    position: 'absolute',
    bottom: 12,
    width: '60%',
    height: 2,
    backgroundColor: '#000',
  },
  sendOtp: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Nunito',
  },
  timerText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 10,
    fontFamily: 'Nunito',
  },
  spacingBelowOtp: {
    height: 120,
  },
  spacingBelowWelcome: {
    height: 100,
  },
  spacingBelowGoogle: {
    height: 20,
  },
  nextButton: {
    backgroundColor: '#000',
    width: 242,
    height: 47,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  nextText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Nunito-Bold',
  },
});
