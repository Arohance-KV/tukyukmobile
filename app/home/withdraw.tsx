import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../redux/authSlice';
import type { RootState, AppDispatch } from '../redux/store';

const transactions = [
  { id: '1', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-1,500' },
  { id: '2', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-500' },
  { id: '3', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-1,210' },
  { id: '4', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-1,874' },
  { id: '5', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-3,400' },
  { id: '6', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-2,222' },
  { id: '7', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-1,543' },
  { id: '8', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-1,123' },
  { id: '9', email: 'amarkunalkumar594-1@oksbi', date: '25/11/2024', time: '07:30pm', amount: '-1,500' },
];

export default function WithdrawScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.walletIconContainer}>
          <Entypo name="wallet" size={28} color="#4B6EF6" />
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.subLabel}>In your TukTuk Account</Text>
          <Text style={styles.amount}>₹{user?.balance ?? '...'}</Text>
        </View>

        <TouchableOpacity style={styles.withdrawButton}>
          <Ionicons name="wallet-outline" size={20} color="#000" />
          <Text style={styles.withdrawText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionsSection}>
        <Text style={styles.recentLabel}>Recent transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.transactionList}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <Image
                source={require('../profile.jpg')}
                style={styles.profileImage}
              />
              <View style={styles.transactionInfo}>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.datetime}>{item.date}   {item.time}</Text>
              </View>
              <Text style={styles.amountText}>{item.amount}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  topSection: {
    backgroundColor: '#4B6EF6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  walletIconContainer: {
   position: 'absolute',
   top: '50%',
   right: 20,
   transform: [{ translateY: -20 }], // half of height (40)
   width: 48,
   height: 48,
   borderRadius: 24,
   backgroundColor: '#FFFFFF',
   justifyContent: 'center',
   alignItems: 'center',
   zIndex: 1,
  },

  balanceContainer: {
    paddingTop: 70,
    alignItems: 'flex-start', // align left
  },
  balanceLabel: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    fontFamily:'Nunito',
  },
  subLabel: {
    fontSize: 14,
    color: '#E6E6E6',
    marginTop: 5,
    fontFamily: 'Nunito',
  },
  amount: {
    fontSize: 43,
    color: '#fff',
    fontWeight: '700',
    marginTop: 10,
    fontFamily: 'Nunito',
  },
  withdrawButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // align left
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start', // place at left side of parent
    marginTop: 50,
  },
  withdrawText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
    fontFamily:'Nunito',
  },
  transactionsSection: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  recentLabel: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily:'Nunito',
  },
  transactionList: {
    paddingBottom: 100,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  transactionInfo: {
    flex: 1,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3366FF',
    fontFamily: 'Nunito',
  },
  datetime: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Nunito',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    fontFamily: 'Nunito',
  },
});
