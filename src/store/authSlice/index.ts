import { APP_TOKEN_KEY } from "@/constants";
import authService from "@/services/auth";
import { LoginParams } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  token: null as string | null,
  isLogged: false as boolean,
};

export const postLogin = createAsyncThunk(
  "auth/login",
  async (data: LoginParams) => {
    try {
      const res = await authService.login(data);
      if (res?.success) {
        return res?.data;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.messages?.[0]);
      return null;
    }
  }
);

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setIsLoggedState: (state, action) => {
      state.isLogged = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      if (action.payload) {
        localStorage.setItem(
          APP_TOKEN_KEY,
          action.payload?.item?.accessToken || ""
        );
        state.isLogged = true;
        state.token = action.payload?.item?.accessToken;
      }
    });
  },
});

export default authSlice;
