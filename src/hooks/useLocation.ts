import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "@/store/locationSlice";
import { useCallback } from "react";

const useLocation = () => {
  const dispatch = useAppDispatch();
  const { provinces, districts, wards } = useAppSelector(
    (state) => state.location
  );

  const handleGetListProvinces = useCallback(() => {
    dispatch(fetchProvinces());
  }, []);

  const handleGetListDistricts = useCallback((provinceId?: number) => {
    dispatch(
      fetchDistricts({
        provinceId,
      })
    );
  }, []);

  const handleGetListWards = useCallback((districtId?: number) => {
    dispatch(fetchWards({ districtId }));
  }, []);

  return {
    provinces,
    districts,
    wards,
    getListProvinces: handleGetListProvinces,
    getListDistricts: handleGetListDistricts,
    getListWards: handleGetListWards,
  };
};

export default useLocation;
