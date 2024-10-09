import { PLACEHOLDER_IMAGE_URL } from "@/constants";
import { getEventAddress } from "@/utils/common";
import { EventModel } from "@/utils/types";
import { Button, Card, Image } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

const { Meta } = Card;

type Props = {
  data?: EventModel;
};

const EventCard: FC<Props> = ({ data }) => {
  const router = useRouter();
  const renderRowInfo = (title: string, value?: any) => {
    return (
      <div className="grid grid-cols-3 gap-2 text-sm text-slate-500 font-medium">
        <span className="col-span-1">{title}</span>
        <span className="text-sm col-span-2">{value || "--"}</span>
      </div>
    );
  };

  return (
    <div className="shadow-lg pb-3 shadow-slate-300">
      <div className="bg-gradient-to-br from-blue-400 to-blue-200 py-4">
        <p className="text-slate-800 font-semibold text-lg text-center">
          {data?.name}
        </p>
      </div>
      <Image
        src={data?.images?.[0]}
        width={"100%"}
        height={180}
        className="object-cover"
        fallback={PLACEHOLDER_IMAGE_URL}
      />
      <div className="px-3">
        <p>{data?.description}</p>
        {renderRowInfo(
          "Thời gian",
          data?.startTime
            ? dayjs(data?.startTime).format("DD/MM/YYYY HH:mm")
            : "--"
        )}
        {renderRowInfo("Địa điểm", getEventAddress(data))}
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={() => router.push(`event/${data?.id}`)}
          >
            Truy cập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
