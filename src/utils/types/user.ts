import { DistrictModel, ProvinceModel, WardModel } from "./location";

export type UserModel = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  dob?: string;
  imageUrl?: string;
  address?: string;
  province?: ProvinceModel;
  district?: DistrictModel;
  ward?: WardModel;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type CreateOtpParams = {
  email: string;
  password: string;
  fullname: string;
  phone: string;
};
