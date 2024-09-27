import { DistrictModel, ProvinceModel, WardModel } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provinces: [] as ProvinceModel[],
  districts: [] as DistrictModel[],
  wards: [] as WardModel[],
};

const locationSlice = createSlice({
  initialState,
  name: "location",
  reducers: {},
});

export default locationSlice;
