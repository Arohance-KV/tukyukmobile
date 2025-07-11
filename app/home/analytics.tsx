import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const performanceData = [
  { day: 'Yesterday', percentage: 70, rating: 'Good' },
  { day: 'Tuesday', percentage: 90, rating: 'Very Good' },
  { day: 'Monday', percentage: 40, rating: 'Poor' },
  { day: 'Sunday', percentage: 70, rating: 'Good' },
  { day: 'Saturday', percentage: 80, rating: 'Good' },
  { day: 'Yesterday', percentage: 70, rating: 'Good' },
];

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Performance Status</Text>
      <View style={styles.progressContainer}>
        <CircularProgress
          value={50}
          radius={100}
          activeStrokeWidth={60}
          inActiveStrokeWidth={60}
          inActiveStrokeColor="#EDEDED"
          activeStrokeColor="#F9D46C"
          valueSuffix="%"
          progressValueColor="#000"
          progressValueFontSize={24}
        />
      </View>

      <View style={styles.listWrapper}>
        <FlatList
          data={performanceData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>{item.percentage}%</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Your Performance</Text>
                <Text style={styles.day}>{item.day}</Text>
              </View>
              <Text style={[styles.rating, getRatingColor(item.rating)]}>{item.rating}</Text>
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

function getRatingColor(rating: string) {
  switch (rating) {
    case 'Very Good':
    case 'Good':
      return { color: '#3366FF' };
    case 'Poor':
      return { color: '#FF9900' };
    default:
      return { color: '#000' };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: 60,
  },
  header: {
    fontSize: 31,
    fontWeight: 700,
    alignSelf: 'center',
    marginBottom: 20,
    fontFamily:'Nunito',
  },
  progressContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  listWrapper: {
    flex: 1, 
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  circleText: {
    color: '#3366FF',
    fontWeight: 'bold',
    fontFamily:'Nunito',
  },
  info: {
    flex: 1,
  },
  label: {
    color: '#888',
    fontSize: 12,
    fontFamily:'Nunito',
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily:'Nunito',
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily:'Nunito',
  },
});
