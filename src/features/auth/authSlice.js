import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  accessExpirationTime: null,
  token: null,
  isLoggedIn: null,
  name: null,
  profileImage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { accessExpirationTime, token, name, profileImage } =
        action.payload;
      state.accessExpirationTime = accessExpirationTime;
      state.token = token;
      state.isLoggedIn = true;
      state.name = name;
      state.profileImage = profileImage;
    },
    logout(state) {
      state.accessExpirationTime = initialAuthState.accessExpirationTime;
      state.token = initialAuthState.token;
      state.isLoggedIn = false;
      state.name = initialAuthState.name;
      state.profileImage = initialAuthState.profileImage;
    },
    updateUserInfo(state, action) {
      const { name, profileImage } = action.payload;
      state.name = name;
      state.profileImage = profileImage;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
