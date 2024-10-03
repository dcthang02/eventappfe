import { useAppDispatch, useAppSelector } from "@/store";
import { fetchFavouriteEvents } from "@/store/userSlice";
import { FetchEventParams } from "@/utils/types";
import { useCallback } from "react";

const useFavourite = () => {
  const dispatch = useAppDispatch();
  const { favouriteEvents, favouritePagination } = useAppSelector(
    (state) => state.user
  );

  const handleGetListFavouriteEvents = useCallback(
    (params: FetchEventParams) => {
      dispatch(fetchFavouriteEvents(params));
    },
    []
  );

  return {
    favouriteEvents,
    favouritePagination,
    getListFavouriteEvents: handleGetListFavouriteEvents,
  };
};

export default useFavourite;
