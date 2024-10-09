import eventService from "@/services/event";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchListEvent } from "@/store/eventSlice";
import { EventModel, FetchEventParams } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ChangeFilterOptions = {
  clearFilter?: boolean;
  removeKey?: string[];
};

const useEvent = () => {
  const dispatch = useAppDispatch();
  const { data, pagination } = useAppSelector((state) => state.event);

  const searchParams = useSearchParams();

  const [eventDetail, setEventDetail] = useState<EventModel | null>(null);
  const [eventFilter, setEventFilter] = useState<FetchEventParams | null>(null);

  useEffect(() => {
    let newFilter: any = {};
    searchParams.entries().forEach(([key, value]) => {
      newFilter[key] = value;
    });
    setEventFilter(newFilter);
  }, [searchParams]);

  const handleGetListEvent = async (params: FetchEventParams) => {
    dispatch(fetchListEvent(params));
  };

  const handleClearFilter = useCallback(() => {
    if (eventFilter && Object.keys(eventFilter).length > 0)
      window.history.pushState(null, "", "?");
  }, [eventFilter]);

  const handleChangeFilter = useCallback(
    (
      filter: FetchEventParams,
      { clearFilter, removeKey }: ChangeFilterOptions = { clearFilter: false }
    ) => {
      let newFilter: any = clearFilter ? filter : { ...eventFilter, ...filter };
      if (removeKey && removeKey.length) {
        for (const key of removeKey) {
          delete newFilter[key];
        }
      }

      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(newFilter)) {
        params.set(key, (value as any).toString());
      }
      window.history.pushState(null, "", `?${params.toString()}`);
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
      handleGetListEvent(eventFilter);
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
    clearFilter: handleClearFilter,
  };
};

export default useEvent;
