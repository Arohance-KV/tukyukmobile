import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://api.arohance.com';

export interface PairingState {
  loading: boolean;
  error: string | null;
  deviceId: string | null;
  sessionToken: string | null;
  success: boolean;
}

const initialState: PairingState = {
  loading: false,
  error: null,
  deviceId: null,
  sessionToken: null,
  success: false,
};

// 🔹 1. INITIATE PAIRING (using deviceId and initialPairingToken)
export const initiatePairing = createAsyncThunk(
  'pairing/initiate',
  async (
    payload: { deviceId: string; initialPairingToken: string },
    { rejectWithValue, getState }
  ) => {
    try {
      // 🔐 Get auth token from redux state
      const state = getState() as any;
      const authToken = state.auth?.accessToken;

      if (!authToken) {
        throw new Error('Authorization token is missing.');
      }

      // 📨 Send request
      const res = await fetch(`${BASE_URL}/pairings/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to initiate pairing');

      return {
        deviceId: payload.deviceId,
        sessionToken: data.data.sessionToken,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unexpected error');
    }
  }
);

export const confirmPairing = createAsyncThunk(
  'pairing/confirm',
  async (
    payload: { deviceId: string; sessionToken: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const authToken = state.auth?.accessToken;
 // update path as per your store

      if (!authToken) throw new Error('Missing auth token');

      const res = await fetch(`${BASE_URL}/pairings/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return true;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔧 SLICE
const pairingSlice = createSlice({
  name: 'pairing',
  initialState,
  reducers: {
    resetPairing: (state) => {
      state.loading = false;
      state.error = null;
      state.deviceId = null;
      state.sessionToken = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // INITIATE
      .addCase(initiatePairing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePairing.fulfilled, (state, action) => {
        state.loading = false;
        state.deviceId = action.payload.deviceId;
        state.sessionToken = action.payload.sessionToken;
      })
      .addCase(initiatePairing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CONFIRM
      .addCase(confirmPairing.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(confirmPairing.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(confirmPairing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetPairing } = pairingSlice.actions;
export default pairingSlice.reducer;
