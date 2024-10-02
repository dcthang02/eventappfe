import axiosInstance from "@/utils/interceptorsAxios";
import { FetchEventParams } from "@/utils/types";

const eventService = {
  getListEvent: async (params: FetchEventParams, forHome: boolean = false) => {
    const res = await axiosInstance.get("/event", { params });
    return res?.data;
  },
};

export default eventService;
