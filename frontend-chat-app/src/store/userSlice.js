import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const userInitialState = { userInfo: userInfoFromLocalStorage };

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    toggleUserTheme: (state) => {
      state.userInfo.darkTheme = !state.userInfo.darkTheme;
    },
    resetUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, resetUserInfo, toggleUserTheme } =
  userSlice.actions;
export default userSlice.reducer;
