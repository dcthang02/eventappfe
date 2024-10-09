"use client";

import useEvent from "@/hooks/useEvent";
import { formatPhoneNumber } from "@/utils/common";
import { Avatar, Button, Divider, Image } from "antd";
import clsx from "clsx";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { PiUsersThreeFill } from "react-icons/pi";

const EventDetailPage = () => {
  const { getEventDetail, eventDetail } = useEvent();

  const params = useParams();

  useEffect(() => {
    const id = params?.eventId;
    if (id) {
      getEventDetail(Number(id));
    }
  }, [params]);

  const renderEventName = useCallback(() => {
    return (
      <div className="">
        <p className="text-3xl font-bold text-blue-600 mb-2">
          {eventDetail?.name}
        </p>
        <div className="text-slate-600 italic bg-slate-100 p-4">
          <p>{eventDetail?.description}</p>
        </div>
      </div>
    );
  }, [eventDetail?.name, eventDetail?.description]);

  const renderImages = useCallback(() => {
    return (
      <div className="grid grid-cols-2 gap-5">
        {eventDetail?.images?.map((item) => (
          <Image
            fallback={
              "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            }
            key={`image-${item}`}
            height={280}
            className="object-cover w-full"
          />
        ))}
      </div>
    );
  }, [eventDetail?.images]);

  const renderAddress = useCallback(() => {
    return (
      <div className="flex gap-5 items-center text-slate-600">
        <GrMapLocation />
        <p>{`${eventDetail?.address}, ${eventDetail?.ward?.name}, ${eventDetail?.district?.name}, ${eventDetail?.province?.name}`}</p>
      </div>
    );
  }, [
    eventDetail?.address,
    eventDetail?.province,
    eventDetail?.district,
    eventDetail?.ward,
  ]);

  const renderTime = useCallback(() => {
    const startTime = eventDetail?.startTime
      ? dayjs(eventDetail?.startTime)
      : undefined;
    const endTime = eventDetail?.endTime
      ? dayjs(eventDetail?.endTime)
      : undefined;
    return (
      <div className="col-span-1 px-5 ">
        <div className="bg-green-600 rounded-xl shadow-md shadow-green-300">
          <div className="border-b border-b-white pb-2">
            <p className="text-white font-semibold text-xl text-center pt-2">
              {startTime?.format("HH:mm")}
            </p>
          </div>
          <div className="py-2 text-white text-center">
            <p className="text-6xl font-extrabold mb-1">
              {startTime?.format("DD")}
            </p>
            <p className="font-semibold">{startTime?.format("MM-YYYY")}</p>
          </div>
        </div>

        <Divider className="h-14">Đến</Divider>

        <div className="bg-red-500 rounded-xl shadow-md shadow-red-300">
          <div className="border-b border-b-white pb-2">
            <p className="text-white font-semibold text-xl text-center pt-2">
              {endTime?.format("HH:mm")}
            </p>
          </div>
          <div className="py-2 text-white text-center">
            <p className="text-6xl font-extrabold mb-1">
              {endTime?.format("DD")}
            </p>
            <p className="font-semibold">{endTime?.format("MM-YYYY")}</p>
          </div>
        </div>
      </div>
    );
  }, [eventDetail?.startTime, eventDetail?.endTime]);

  const renderSlot = useCallback(() => {
    return (
      <div
        className={clsx(
          eventDetail?.remainingSlot === 0 ? "text-red-500" : "text-green-500",
          "flex items-center gap-5"
        )}
      >
        <PiUsersThreeFill className="text-slate-600" />
        <p>
          {eventDetail?.totalParticipants} / {eventDetail?.totalSlot}
        </p>
        <p>{eventDetail?.remainingSlot === 0 ? "Hết chỗ" : "Còn chỗ"}</p>
      </div>
    );
  }, [
    eventDetail?.totalParticipants,
    eventDetail?.totalSlot,
    eventDetail?.remainingSlot,
  ]);

  const renderTicket = useCallback(() => {
    return (
      <div className="flex items-center gap-5 text-slate-600">
        <FaMoneyBill1Wave />
        <p>
          {!eventDetail?.ticketPrice || eventDetail?.ticketPrice === 0
            ? "Miễn phí"
            : eventDetail?.ticketPrice?.toLocaleString()}
        </p>
      </div>
    );
  }, [eventDetail?.ticketPrice]);

  const renderOwner = useCallback(() => {
    return (
      <div className="flex items-center gap-3">
        <p className="text-slate-500 font-medium">Tổ chức bởi</p>
        <div className="flex p-2 border rounded-md gap-2">
          <Avatar
            src={eventDetail?.owner?.imageUrl}
            icon={<FaUserCircle />}
            size={"large"}
          />
          <div className="text-sm font-semibold text-slate-800">
            <p>{eventDetail?.owner?.fullname}</p>
            <p className="text-gray-500">
              {formatPhoneNumber(eventDetail?.owner?.phone)}
            </p>
          </div>
        </div>
      </div>
    );
  }, [eventDetail?.owner]);

  const renderAction = useCallback(() => {
    return (
      <div className="flex gap-4 justify-end col-span-4 py-3">
        <Button
          size="large"
          icon={<FaHeart size={18} className="fill-red-400" />}
        >
          Thêm vào yêu thích
        </Button>
        <Button type="primary" size="large">
          Đăng ký tham gia
        </Button>
      </div>
    );
  }, []);

  return (
    <div className="py-10 px-40 min-h-[100vh] flex flex-col gap-10">
      {eventDetail ? (
        <div className="grid grid-cols-4">
          {renderTime()}
          <div className="col-span-3 flex flex-col gap-8 pl-5 border-l">
            {renderEventName()}
            {renderOwner()}
            {renderImages()}
            <div className="flex flex-col gap-2">
              {renderAddress()}
              {renderSlot()}
              {renderTicket()}
            </div>
          </div>
          {renderAction()}
        </div>
      ) : null}
    </div>
  );
};

export default EventDetailPage;
