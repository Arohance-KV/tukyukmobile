import {useEffect} from "react";
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../redux/authSlice';
import type { RootState, AppDispatch } from '../redux/store';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const balance = user?.balance ?? 0;
  useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  dispatch(getProfile()); // 👈 Load user profile

  return () => backHandler.remove();
}, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4F80FF', '#3B66F8']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>₹{balance}</Text>

          <View style={styles.monthRow}>
            <AntDesign name="left" size={16} color="#fff" />
            <Text style={styles.month}>May 2025</Text>
            <AntDesign name="right" size={16} color="#fff" />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.financeCard}>
        <View style={styles.incomeBox}>
          <View style={[styles.iconWrapper, { backgroundColor: '#DDF5F3' }]}>
            <AntDesign name="caretup" size={16} color="#34C759" />
          </View>
          <View>
            <Text style={styles.incomeLabel}>Net income</Text>
            <Text style={styles.incomeValue}>₹6,650</Text>
          </View>
        </View>

        <View style={styles.expenditureBox}>
          <View style={[styles.iconWrapper, { backgroundColor: '#FBE4E2' }]}>
            <AntDesign name="caretdown" size={16} color="#FF3B30" />
          </View>
          <View>
            <Text style={styles.expenditureLabel}>Expenditure</Text>
            <Text style={styles.expenditureValue}>₹3,600</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartTextContainer}>
          <Text style={styles.chartTitle}>Monthly Screen Time</Text>
          <Text style={styles.chartSubtitle}>Spend: 120hr / 280hours</Text>
        </View>
        <AnimatedCircularProgress
          size={125}
          width={25}
          fill={(120 / 280) * 100}
          tintColor="#F9D46C"
          backgroundColor="#eee"
          rotation={0}
          lineCap="round"
        />
      </View>

      
      <Text style={styles.sectionTitle}>Feedback or Support Shortcuts</Text>
      <View style={styles.supportRow}>
        <SupportBox text="Report a problem" color="#f66" icon="exclamationcircle" />
        <SupportBox text="Chat with support" color="#ffc107" icon="message1" />
        <SupportBox text="Suggest a new ad" color="#4dd0e1" icon="bulb1" />
      </View>
    </View>
  );
}

const SupportBox = ({
  text,
  color,
  icon,
}: {
  text: string;
  color: string;
  icon: any;
}) => (
  <View style={[styles.supportBox, { backgroundColor: color + '20' }]}>
    <View style={[styles.iconCircle, { backgroundColor: color }]}>
      <AntDesign name={icon} size={18} color="#fff" />
    </View>
    <Text style={styles.supportText}>{text}</Text>
    <Text style={styles.tuktuk}>TUKTUK ADS</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f5fa',
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 80,
    paddingBottom: 30,
    marginBottom: -24,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 16,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Nunito'
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 700,
    marginTop: 6,
    fontFamily: 'Nunito',
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  month: {
    color: '#fff',
    fontSize: 14,
    fontFamily:'Nunito',
  },

  financeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  incomeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  expenditureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  incomeLabel: {
    color: '#999',
    fontSize: 13,
    marginBottom: 2,
    fontFamily: 'Nunito',
  },
  expenditureLabel: {
    color: '#999',
    fontSize: 13,
    marginBottom: 2,
    fontFamily: 'Nunito',
  },
  incomeValue: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Nunito',
  },
  expenditureValue: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    fontFamily: 'Nunito',
  },

  chartCard: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 4,
  },
  chartTextContainer: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
    marginBottom: 6,
    fontFamily: 'Nunito',
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Nunito',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 12,
    color: '#1F2937',
    fontFamily: 'Nunito',
  },

  supportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 16,
    fontFamily: 'Nunito',
  },
  supportBox: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#eee',
    fontFamily: 'Nunito',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  supportText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Nunito',
  },
  tuktuk: {
    fontSize: 10,
    color: '#777',
    marginTop: 4,
    fontFamily: 'Nunito',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
