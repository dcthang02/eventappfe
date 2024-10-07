import { ROUTES } from "@/constants/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { postLogin } from "@/store/authSlice";
import { LoginParams } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, isLogged } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
  };
};

export default useAuth;
