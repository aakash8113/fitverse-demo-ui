import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  user: {
    id?: number;
    name?: string;
    email?: string;
    avatar?: string;
    preferences?: {
      size?: string;
      style?: string[];
      colors?: string[];
    };
    measurements?: {
      height?: number;
      weight?: number;
      chest?: number;
      waist?: number;
      inseam?: number;
    };
  };
}

const initialState: UserState = {
  isAuthenticated: false,
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<UserState['user']>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state: UserState) => {
      state.isAuthenticated = false;
      state.user = {};
    },
    updateProfile: (state: UserState, action: PayloadAction<Partial<UserState['user']>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    updatePreferences: (state: UserState, action: PayloadAction<UserState['user']['preferences']>) => {
      state.user.preferences = { ...state.user.preferences, ...action.payload };
    },
    updateMeasurements: (state: UserState, action: PayloadAction<UserState['user']['measurements']>) => {
      state.user.measurements = { ...state.user.measurements, ...action.payload };
    },
  },
});

export const { login, logout, updateProfile, updatePreferences, updateMeasurements } = userSlice.actions;
export default userSlice.reducer;