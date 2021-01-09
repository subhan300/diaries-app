 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken(state, { payload }: PayloadAction<string>) {
        console.log("payload bta",payload)
      if (payload) {
        state.token = payload;
      }
    },
    clearToken(state) {
      state.token = null;
    },
    setAuthState(state, { payload }: PayloadAction<boolean>) {
        console.log(payload)
      state.isAuthenticated = payload;
    },
  },
});

export const { saveToken, clearToken, setAuthState } = auth.actions;

export default auth.reducer