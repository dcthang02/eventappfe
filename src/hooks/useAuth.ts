import { useAppSelector } from "@/store";

const useAuth = () => {
  const { token, isLogged } = useAppSelector((state) => state.auth);

  return {
    token,
    isLogged,
  };
};

export default useAuth;
