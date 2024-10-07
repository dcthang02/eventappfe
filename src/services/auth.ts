import axiosInstance from "@/utils/interceptorsAxios";
import { LoginParams } from "@/utils/types";

const authService = {
  login: async (data: LoginParams) => {
    const response = await axiosInstance.post("/auth/signin", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data;
  },
};

export default authService;
