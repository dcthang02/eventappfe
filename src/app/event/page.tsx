"use client";

import { CATEGORIES, SORT_VALUE } from "@/constants";
import useEvent from "@/hooks/useEvent";
import { Button, Checkbox, Dropdown, MenuProps, Select } from "antd";
import clsx from "clsx";
import React, { ReactNode, useCallback, useState } from "react";
import { RiFilter2Fill } from "react-icons/ri";
import { VscThreeBars } from "react-icons/vsc";

const items = CATEGORIES.map((item) => ({
  label: item.name,
  value: item.value,
}));

const EventPage = () => {
  const { filter, onChangeFilter } = useEvent();

  const [showFilter, setShowFilter] = useState(true);

  const renderFilterSection = useCallback(
    (title: string, content?: ReactNode, isShowDivide: boolean = true) => {
      return (
        <div
          className={clsx(
            "py-6",
            isShowDivide ? "border-b border-b-gray-300" : ""
          )}
        >
          <p className="font-semibold">{title}</p>
          {content}
        </div>
      );
    },
    []
  );

  const renderAddressFilter = useCallback(() => {
    return (
      <div className="flex flex-col gap-3">
        <div className="">
          <p className="text-sm font-medium">Tỉnh thành</p>
          <Select
            options={[]}
            style={{ minWidth: "100%" }}
            placeholder="Chọn tỉnh thành"
            allowClear
            size="large"
          />
        </div>
        <div className="">
          <p className="text-sm font-medium">Quận huyện</p>
          <Select
            options={[]}
            style={{ minWidth: "100%" }}
            placeholder="Chọn quận huyện"
            allowClear
            size="large"
          />
        </div>
        <div className="">
          <p className="text-sm font-medium">Phường</p>
          <Select
            options={[]}
            style={{ minWidth: "100%" }}
            placeholder="Chọn phường xã"
            allowClear
            size="large"
          />
        </div>
      </div>
    );
  }, []);

  const renderSortFilter = useCallback(() => {
    return (
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 items-center">
          <p>Độ phổ biến</p>
          <Select options={SORT_VALUE} allowClear placeholder="Độ phổ biến" />
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <p>Giá vé</p>
          <Select options={SORT_VALUE} allowClear placeholder="Giá vé" />
        </div>
      </div>
    );
  }, []);

  return (
    <div className="flex">
      <div
        className={clsx("overflow-x-hidden", showFilter ? "w-[260px]" : "w-0")}
        style={{
          transition: "width 0.5s ease",
        }}
      >
        <div className="pl-4 py-4 w-[260px]">
          <div className="flex items-center gap-3">
            <RiFilter2Fill />
            <p className="text-xl font-semibold text-slate-800">Bộ lọc</p>
          </div>
          {renderFilterSection(
            "Danh mục",
            <Select
              options={items}
              style={{ minWidth: "100%" }}
              placeholder="Chọn danh mục"
              allowClear
              size="large"
            />
          )}
          {renderFilterSection("Địa điểm", renderAddressFilter())}
          {renderFilterSection("Giá vé", <Checkbox>Miễn phí</Checkbox>)}
          {renderFilterSection(
            "Trạng thái chỗ ngồi",
            <Checkbox>Còn chỗ trống</Checkbox>
          )}
          {renderFilterSection("Sắp xếp", renderSortFilter(), false)}
        </div>
      </div>
      <div className="flex-1 p-4">
        <Button
          type="text"
          icon={<VscThreeBars size={32} />}
          onClick={() => setShowFilter(!showFilter)}
        />
      </div>
    </div>
  );
};

export default EventPage;
