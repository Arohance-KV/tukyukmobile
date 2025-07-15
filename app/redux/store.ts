import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import otpReducer from './otpSlice';
import pairingReducer from './pairingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  otp: otpReducer,
  pairing: pairingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
