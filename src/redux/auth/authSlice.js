import { register, login, logout } from "./auth-operations";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  isLoading: false,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.accessToken;
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.token = "";
        state.user = {};
        state.isAuth = false;
      })

      .addMatcher(
        isAnyOf(register.pending, login.pending, logout.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(register.rejected, login.rejected, logout.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export default authSlice.reducer;
