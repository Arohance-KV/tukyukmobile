import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import otpReducer from './otpSlice';
import pairingReducer from './pairingSlice';
export const store = configureStore({
  
  reducer: {
    auth: authReducer,
    otp: otpReducer,
    pairing: pairingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
