// redux/initAuth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from './authSlice';
import { AppDispatch } from './store';
import { setTokens } from './authSlice'; // You will define this below

export const initializeAuth = () => async (dispatch: AppDispatch) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    dispatch(setTokens({ accessToken, refreshToken }));
    dispatch(getProfile());
  }
};
