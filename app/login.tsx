import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from './redux/authSlice'; // adjust path
import type { RootState, AppDispatch } from './redux/store';

export default function LoginScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState('');
  const inputRefs = useRef<TextInput[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, accessToken, error } = useSelector((state: RootState) => state.auth);
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
  const phoneNumber = `+91${mobile}`;
  dispatch(sendOtp(phoneNumber));
  setOtpSent(true);
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
        <Text style={styles.highlight}>WELCOME!</Text>
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

             ref={(ref) => {if (ref) inputRefs.current[i] = ref;}}
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

      <View style={styles.spacingBelowOtp} />
      <View style={styles.spacingBelowGoogle} />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          const enteredOtp = otp.join('');
          if (enteredOtp.length !== 6) {
            Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP.');
            return;
          }
          const phoneNumber = `+91${mobile}`;

           dispatch(verifyOtp({ mobile: phoneNumber, otp: enteredOtp }))
             .unwrap()
             .then(() => router.push('/home'))
             .catch((err) => Alert.alert('Login Failed', err.message || 'Something went wrong'));
        }}>
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subtext: {
  fontSize: 20,
  fontFamily: 'Nunito',
  color: '#000',
},

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
    fontSize: 18,
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
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    fontFamily: 'Nunito-SemiBold',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  googleButton: {
    width: 361,
    height: 65,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
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
