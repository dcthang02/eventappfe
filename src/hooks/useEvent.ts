import { useAppDispatch, useAppSelector } from "@/store";
import { fetchListEvent } from "@/store/eventSlice";
import { FetchEventParams } from "@/utils/types";

const useEvent = () => {
  const dispatch = useAppDispatch();
  const { data, pagination } = useAppSelector((state) => state.event);

  const handleGetListEvent = async (params: FetchEventParams) => {
    dispatch(fetchListEvent(params));
  };

  return {
    data,
    pagination,
    getEventData: handleGetListEvent,
  };
};

export default useEvent;
