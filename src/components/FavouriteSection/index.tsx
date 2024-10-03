import useFavourite from "@/hooks/useFavourite";
import React, { FC, useCallback } from "react";
import EventCard from "../EventCard";
import { Button, Pagination } from "antd";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import UnAuthorizedImage from "@/assets/unauth.jpg";

type Props = {
  max?: number;
  disablePagination?: boolean;
};

const FavouriteSection: FC<Props> = ({ max, disablePagination = false }) => {
  const { isLogged } = useAuth();
  const { favouriteEvents, favouritePagination } = useFavourite();

  const renderUnAuthoried = useCallback(() => {
    return (
      <div className="col-span-4 flex flex-col items-center gap-2">
        <Image src={UnAuthorizedImage} alt="" className="w-[25%]" />

        <p className="text-slate-600">
          Bạn chưa đăng nhập! Hãy đăng nhập để có thể thêm các sự kiện yêu
          thích.
        </p>
        <Button type="primary" size="large">
          Đăng nhập
        </Button>
      </div>
    );
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 border p-10">
      {isLogged
        ? favouriteEvents?.map((item) => (
            <EventCard data={item} key={`event-favourite-${item?.id}`} />
          ))
        : renderUnAuthoried()}
      {disablePagination ? null : <Pagination />}
    </div>
  );
};

export default FavouriteSection;
