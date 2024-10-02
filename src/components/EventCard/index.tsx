import { EventModel } from "@/utils/types";
import { Card } from "antd";
import React, { FC } from "react";

const { Meta } = Card;

type Props = {
  data?: EventModel;
};

const EventCard: FC<Props> = ({ data }) => {
  return (
    <Card>
      <Meta title={data?.name} description={data?.description} />
      <p>123</p>
    </Card>
  );
};

export default EventCard;
