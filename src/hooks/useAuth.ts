import { APP_TOKEN_KEY } from "@/constants";
import { ROUTES } from "@/constants/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import authSlice, { postLogin } from "@/store/authSlice";
import { LoginParams } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, isLogged } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCheckLoginState = useCallback(() => {
    const token = localStorage.getItem(APP_TOKEN_KEY);
    dispatch(authSlice.actions.setIsLoggedState(token ? true : false));
  }, []);

  const handleLogin = useCallback(async (data: LoginParams) => {
    setLoading(true);
    try {
      const res = await dispatch(postLogin(data));
      if (res?.payload) router.replace(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    token,
    isLogged,
    loading,
    login: handleLogin,
    checkAuth: handleCheckLoginState,
  };
};

export default useAuth;
