import { useAppSelector } from "@/store";

const useAuth = () => {
  const { token } = useAppSelector((state) => state.auth);

  return {
    token,
  };
};

export default useAuth;
