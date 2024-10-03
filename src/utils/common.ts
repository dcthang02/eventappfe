import { EventModel } from "./types";

export const getEventAddress = (data?: EventModel) => {
  if (!data) return undefined;
  return `${data?.address}, ${data?.ward?.name}, ${data?.district?.name}, ${data?.province?.name}`;
};
