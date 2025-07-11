import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70 + insets.bottom, // ✅ extend height for safe area
          paddingBottom: insets.bottom + 10, // ✅ push content above system bar
          paddingTop: 10,
          backgroundColor: '#fff',
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },
      }}
    >
      <Tabs.Screen
        name="pair"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="grid-outline"
              size={24}
              color={focused ? '#466AEA' : '#6B6B6B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="pie-chart-outline"
              size={24}
              color={focused ? '#466AEA' : '#6B6B6B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.centerButton, focused && styles.centerButtonActive]}>
              <Ionicons name="add" size={36} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="withdraw"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="swap-vertical-outline"
              size={24}
              color={focused ? '#466AEA' : '#6B6B6B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={focused ? '#466AEA' : '#6B6B6B'}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  centerButton: {
  width: 60,
  height: 60,
  backgroundColor: '#466AEA',
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: Platform.OS === 'android' ? 40 : 30, // ✅ tweak this
  borderWidth: 1.5,
  borderColor: '#FFFFFF',
},
  centerButtonActive: {
    backgroundColor: '#365ac9',
  },
});
