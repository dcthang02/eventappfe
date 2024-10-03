"use client";

import Image from "next/image";
import React, { Fragment, useCallback, useEffect } from "react";
import HeroEvent from "@/assets/event-hero.png";
import useEvent from "@/hooks/useEvent";
import EventCard from "@/components/EventCard";
import { Button } from "antd";
import FavouriteSection from "@/components/FavouriteSection";

export default function Home() {
  const { data, getEventData } = useEvent();

  useEffect(() => {
    getEventData({ isPopular: "1" });
  }, []);

  const renderListEvent = useCallback(() => {
    return (
      <div className="grid grid-cols-4 gap-6">
        {data?.map((item) => (
          <Fragment key={`event-item-${item?.id}`}>
            <EventCard data={item} />
          </Fragment>
        ))}
      </div>
    );
  }, [data]);

  return (
    <div className="py-10">
      <div className="px-24">
        <div className="bg-home-hero bg-center bg-cover bg-no-repeat h-[420px] p-12 mb-12">
          <div className="flex items-end">
            <div className="flex-1 self-stretch flex flex-col justify-center">
              <div className="p-5 bg-white w-[60%] shadow-md">
                <p className="text-3xl font-semibold mb-2">Xin chào</p>
                <p>Tham gia không giới hạn các sự kiện với danh mục cụ thể</p>
              </div>
            </div>
            <div className="flex-1">
              <Image alt="" src={HeroEvent} width={320} />
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="flex justify-between">
            <p className="mb-2 font-semibold text-2xl">
              Sự kiện phổ biến dành cho bạn
            </p>
            <Button type="default">Xem tất cả</Button>
          </div>
          {renderListEvent()}
        </div>
        <div>
          <div className="flex justify-between">
            <p className="mb-2 font-semibold text-2xl">
              Sự kiện yêu thích của bạn
            </p>
            <Button type="default">Xem tất cả</Button>
          </div>

          <FavouriteSection disablePagination />
        </div>
      </div>
    </div>
  );
}
