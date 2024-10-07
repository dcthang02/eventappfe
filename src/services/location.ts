import axiosInstance from "@/utils/interceptorsAxios";
import { FetchDistrictParams, FetchWardParams } from "@/utils/types";

const locationService = {
  getProvinces: async () => {
    const response = await axiosInstance.get("/location/province");
    return response?.data;
  },

  getDistricts: async (params: FetchDistrictParams) => {
    const response = await axiosInstance.get("/location/district", { params });
    return response?.data;
  },

  getWards: async (params: FetchWardParams) => {
    const response = await axiosInstance.get("/location/ward", { params });
    return response?.data;
  },
};

export default locationService;
