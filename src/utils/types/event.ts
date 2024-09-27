import { DistrictModel, ProvinceModel, WardModel } from "./location";

export type EventModel = {
  id: number;
  name: string;
  description: string;
  images: string[];
  startTime: string;
  endTime: string;
  province: ProvinceModel;
  district: DistrictModel;
  ward: WardModel;
  address: string;
  type: string;
  isDraft: boolean;
  needRegister: boolean;
  isDeleted: boolean;
  totalSlot: number;
  ticketPrice: number;
  totalParticipants: number;
  remainingSlot: number;
};
