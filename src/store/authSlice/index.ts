import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null as string | null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
});

export default authSlice;
