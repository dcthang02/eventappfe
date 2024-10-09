import { EventModel } from "./types";

export const getEventAddress = (data?: EventModel) => {
  if (!data) return undefined;
  return `${data?.address}, ${data?.ward?.name}, ${data?.district?.name}, ${data?.province?.name}`;
};

export const formatPhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) return "";
  phoneNumber = phoneNumber.replace("+84", "0");

  if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  } else {
    return "";
  }
};
