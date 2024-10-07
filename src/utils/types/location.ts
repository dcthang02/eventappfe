export type ProvinceModel = {
  id: number;
  name: string;
};

export type DistrictModel = {
  id: number;
  name: string;
};

export type WardModel = {
  id: number;
  name: string;
};

export type FetchDistrictParams = {
  provinceId?: number;
};

export type FetchWardParams = {
  districtId?: number;
};
