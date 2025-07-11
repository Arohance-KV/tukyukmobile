import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.arohance.com';

// ✅ Send OTP
export const sendOtp = createAsyncThunk(
  'otp/sendOtp',
  async (mobile: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: mobile }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Send OTP failed');

      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Verify OTP
export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async (
    { mobile, otp }: { mobile: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: mobile, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP verification failed');

      return data.data.tempToken;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const completeProfile = createAsyncThunk(
  'otp/completeProfile',
  async (
    payload: { firstName: string; lastName: string; vehicleNumber: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state: any = getState();
      const tempToken = state.otp.tempToken;

      if (!tempToken) throw new Error('Temporary token missing');

      const res = await fetch(`${BASE_URL}/auth/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-temp-token': tempToken, // ✅ fixed header
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Profile completion failed');

      const { accessToken, refreshToken } = data.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      return { accessToken, refreshToken };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ otpSlice
const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    tempToken: null as string | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearOtpState: (state) => {
      state.tempToken = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.tempToken = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // complete profile
      .addCase(completeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(completeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOtpState } = otpSlice.actions;
export default otpSlice.reducer;
