import { UserModel } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null as UserModel | null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
});

export default userSlice;
