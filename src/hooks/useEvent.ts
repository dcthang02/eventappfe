import { useAppDispatch, useAppSelector } from "@/store";
import { fetchListEvent } from "@/store/eventSlice";
import { FetchEventParams } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type ChangeFilterOptions = {
  clearFilter?: boolean;
};

const useEvent = () => {
  const dispatch = useAppDispatch();
  const { data, pagination } = useAppSelector((state) => state.event);

  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (eventFilter) {
      console.log(eventFilter);
      // fetch data here
    }
  }, [eventFilter]);

  return {
    data,
    pagination,
    getEventData: handleGetListEvent,
    filter: eventFilter,
    onChangeFilter: handleChangeFilter,
  };
};

export default useEvent;
