import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
//import { PersistGate } from 'redux-persist/integration/react'; // ✅ NEW
import { store } from './redux/store'; // ✅ UPDATED
import { initializeAuth } from './redux/initAuth'; // ✅

import type { AppDispatch } from './redux/store';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const dispatch = useDispatch<AppDispatch>();
  const [fontsLoaded] = useFonts({
    Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await dispatch(initializeAuth());
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <Provider store={store}>
      <RootLayoutInner />
    </Provider>
  );
}
