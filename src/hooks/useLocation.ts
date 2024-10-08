import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "@/store/locationSlice";
import { useCallback, useState } from "react";

const useLocation = () => {
  const dispatch = useAppDispatch();
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
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
    provinceId,
    districtId,
    setProvinceId,
    setDistrictId,
  };
};

export default useLocation;
