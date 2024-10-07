import locationService from "@/services/location";
import {
  DistrictModel,
  FetchDistrictParams,
  FetchWardParams,
  ProvinceModel,
  WardModel,
} from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  provinces: [] as ProvinceModel[],
  districts: [] as DistrictModel[],
  wards: [] as WardModel[],
};

export const fetchProvinces = createAsyncThunk(
  "location/province",
  async () => {
    try {
      const res = await locationService.getProvinces();
      if (res?.success) {
        return res?.data;
      }
    } catch (error) {
      return null;
    }
  }
);

export const fetchDistricts = createAsyncThunk(
  "location/district",
  async (params: FetchDistrictParams) => {
    try {
      const res = await locationService.getDistricts(params);
      if (res?.success) {
        return res?.data;
      }
    } catch (error) {
      return null;
    }
  }
);

export const fetchWards = createAsyncThunk(
  "location/ward",
  async (params: FetchWardParams) => {
    try {
      const res = await locationService.getWards(params);
      if (res?.success) {
        return res?.data;
      }
    } catch (error) {
      return null;
    }
  }
);

const locationSlice = createSlice({
  initialState,
  name: "location",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProvinces.fulfilled, (state, action) => {
      if (action.payload) {
        state.provinces = action.payload?.items || [];
      }
    }),
      builder.addCase(fetchDistricts.fulfilled, (state, action) => {
        if (action.payload) {
          state.districts = action.payload?.items || [];
        }
      }),
      builder.addCase(fetchWards.fulfilled, (state, action) => {
        if (action.payload) {
          state.wards = action.payload?.items || [];
        }
      });
  },
});

export default locationSlice;
