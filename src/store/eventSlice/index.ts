import { DEFAULT_PAGINATION } from "@/constants";
import { EventModel, PaginationType } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [] as EventModel[],
  pagination: DEFAULT_PAGINATION as PaginationType,
};

const eventSlice = createSlice({
  initialState,
  name: "event",
  reducers: {},
});

export default eventSlice;
