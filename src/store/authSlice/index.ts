import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null as string | null,
  isLogged: false as boolean,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
});

export default authSlice;
