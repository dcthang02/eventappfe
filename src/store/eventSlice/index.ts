import { DEFAULT_PAGINATION } from "@/constants";
import eventService from "@/services/event";
import { EventModel, FetchEventParams, PaginationType } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [] as EventModel[],
  pagination: DEFAULT_PAGINATION as PaginationType,
};

export const fetchListEvent = createAsyncThunk(
  "event/list-event",
  async (params: FetchEventParams) => {
    try {
      const res = await eventService.getListEvent(params);
      if (res?.success) {
        return res?.data;
      }
    } catch (error) {
      return null;
    }
  }
);

const eventSlice = createSlice({
  initialState,
  name: "event",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListEvent.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload.items || [];
        state.pagination = action.payload.pagination || DEFAULT_PAGINATION;
      }
    });
  },
});

export default eventSlice;
