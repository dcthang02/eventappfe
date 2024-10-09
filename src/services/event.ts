import axiosInstance from "@/utils/interceptorsAxios";
import { FetchEventParams } from "@/utils/types";

const eventService = {
  getListEvent: async (params: FetchEventParams) => {
    const res = await axiosInstance.get("/event", { params });
    return res?.data;
  },

  getDetailEvent: async (id: number) => {
    const res = await axiosInstance.get(`/event/detail/${id}`);
    return res?.data;
  },

  getFavouriteEvent: async (params: FetchEventParams) => {
    const res = await axiosInstance.get("/event/favorites", { params });
    return res?.data;
  },
};

export default eventService;
