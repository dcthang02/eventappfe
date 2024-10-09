import eventService from "@/services/event";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchListEvent } from "@/store/eventSlice";
import { EventModel, FetchEventParams } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ChangeFilterOptions = {
  clearFilter?: boolean;
};

const useEvent = () => {
  const dispatch = useAppDispatch();
  const { data, pagination } = useAppSelector((state) => state.event);

  const searchParams = useSearchParams();

  const [eventDetail, setEventDetail] = useState<EventModel | null>(null);
  const [eventFilter, setEventFilter] = useState<FetchEventParams>({});

  useEffect(() => {
    if (searchParams.size === 0) return;
    let newFilter: any = {};
    searchParams.entries().forEach(([key, value]) => {
      newFilter[key] = value;
    });
    setEventFilter(newFilter);
  }, [searchParams]);

  const handleGetListEvent = async (params: FetchEventParams) => {
    dispatch(fetchListEvent(params));
  };

  const handleChangeFilter = useCallback(
    (
      filter: FetchEventParams,
      { clearFilter }: ChangeFilterOptions = { clearFilter: false }
    ) => {
      let newFilter = clearFilter ? filter : { ...eventFilter, ...filter };
      setEventFilter(newFilter);

      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(newFilter)) {
        params.set(key, value.toString());
        window.history.pushState(
          null,
          "",
          encodeURIComponent(params.toString())
        );
      }
    },
    [eventFilter]
  );

  const handleGetEventDetail = useCallback(async (id?: number) => {
    if (!id) return;
    try {
      const res = await eventService.getDetailEvent(id);
      if (res?.success) {
        setEventDetail(res?.data?.item);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  }, []);

  useEffect(() => {
    if (eventFilter) {
      console.log(eventFilter);
      // fetch data here
    }
  }, [eventFilter]);

  return {
    data,
    eventDetail,
    pagination,
    getEventData: handleGetListEvent,
    getEventDetail: handleGetEventDetail,
    filter: eventFilter,
    onChangeFilter: handleChangeFilter,
  };
};

export default useEvent;
