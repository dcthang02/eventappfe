import { DEFAULT_PAGINATION } from "@/constants";
import eventService from "@/services/event";
import {
  EventModel,
  FetchEventParams,
  PaginationType,
  UserModel,
} from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null as UserModel | null,
  favouriteEvents: [] as EventModel[],
  favouritePagination: DEFAULT_PAGINATION as PaginationType,
};

export const fetchFavouriteEvents = createAsyncThunk(
  "user/favourite-events",
  async (params: FetchEventParams) => {
    try {
      const res = await eventService.getFavouriteEvent(params);
      if (res?.success) {
        return res?.data;
      }
    } catch (error) {
      return null;
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavouriteEvents.fulfilled, (state, action) => {
      if (action.payload) {
        (state.favouriteEvents = action.payload?.items || []),
          (state.favouritePagination =
            action.payload?.pagination || DEFAULT_PAGINATION);
      }
    });
  },
});

export default userSlice;
