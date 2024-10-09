"use client";

import EventCard from "@/components/EventCard";
import { CATEGORIES, SORT_VALUE } from "@/constants";
import useEvent from "@/hooks/useEvent";
import useLocation from "@/hooks/useLocation";
import { Button, Checkbox, Select } from "antd";
import clsx from "clsx";
import React, { ReactNode, useCallback, useState } from "react";
import { RiFilter2Fill } from "react-icons/ri";
import { VscThreeBars } from "react-icons/vsc";

const items = CATEGORIES.map((item) => ({
  label: item.name,
  value: item.value,
}));

const EventPage = () => {
  const { data, filter, onChangeFilter, clearFilter } = useEvent();
  const { provinces, districts, wards, getListDistricts, getListWards } =
    useLocation();

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
            options={provinces?.map((item) => ({
              label: item?.name,
              value: item?.id,
            }))}
            style={{ minWidth: "100%" }}
            placeholder="Chọn tỉnh thành"
            allowClear
            size="large"
            value={filter?.provinceId ? Number(filter?.provinceId) : undefined}
            onChange={(value) => {
              getListDistricts(value || -1);
              onChangeFilter(value ? { provinceId: value.toString() } : {}, {
                removeKey: value
                  ? ["districtId", "wardId"]
                  : ["provinceId", "districtId", "wardId"],
              });
            }}
          />
        </div>
        <div className="">
          <p className="text-sm font-medium">Quận huyện</p>
          <Select
            options={districts?.map((item) => ({
              label: item?.name,
              value: item?.id,
            }))}
            style={{ minWidth: "100%" }}
            placeholder="Chọn quận huyện"
            allowClear
            size="large"
            value={filter?.districtId ? Number(filter?.districtId) : undefined}
            onChange={(value) => {
              getListWards(value);
              onChangeFilter(value ? { districtId: value.toString() } : {}, {
                removeKey: value ? ["wardId"] : ["districtId", "wardId"],
              });
            }}
          />
        </div>
        <div className="">
          <p className="text-sm font-medium">Phường</p>
          <Select
            options={wards?.map((item) => ({
              label: item?.name,
              value: item?.id,
            }))}
            style={{ minWidth: "100%" }}
            placeholder="Chọn phường xã"
            allowClear
            size="large"
            value={filter?.wardId ? Number(filter?.wardId) : undefined}
            onChange={(value) =>
              onChangeFilter(value ? { wardId: value.toString() } : {}, {
                removeKey: value ? undefined : ["wardId"],
              })
            }
          />
        </div>
      </div>
    );
  }, [
    provinces,
    districts,
    wards,
    filter?.provinceId,
    filter?.districtId,
    filter?.wardId,
    onChangeFilter,
  ]);

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

  const renderEvents = useCallback(() => {
    return (
      <div className="grid grid-cols-4 gap-3">
        {data?.map((item) => (
          <EventCard data={item} key={`card-event-${item?.id}`} />
        ))}
      </div>
    );
  }, [data]);

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
              value={
                filter?.categoryId ? Number(filter?.categoryId) : undefined
              }
              onChange={(value) =>
                onChangeFilter(value ? { categoryId: value.toString() } : {}, {
                  removeKey: value ? undefined : ["categoryId"],
                })
              }
            />
          )}
          {renderFilterSection("Địa điểm", renderAddressFilter())}
          {renderFilterSection(
            "Giá vé",
            <Checkbox
              checked={filter?.isFree === "1" ? true : false}
              onChange={(e) =>
                onChangeFilter(e.target.checked ? { isFree: "1" } : {}, {
                  removeKey: e.target.checked ? undefined : ["isFree"],
                })
              }
            >
              Miễn phí
            </Checkbox>
          )}
          {renderFilterSection(
            "Trạng thái chỗ ngồi",
            <Checkbox
              checked={filter?.isAvailable === "1" ? true : false}
              onChange={(e) =>
                onChangeFilter(e.target.checked ? { isAvailable: "1" } : {}, {
                  removeKey: e.target.checked ? undefined : ["isAvailable"],
                })
              }
            >
              Còn chỗ trống
            </Checkbox>
          )}
          {renderFilterSection("Sắp xếp", renderSortFilter(), false)}
        </div>
      </div>
      <div className="flex-1 py-4 px-8">
        <Button
          type="text"
          icon={<VscThreeBars size={32} />}
          onClick={() => setShowFilter(!showFilter)}
        />
        {renderEvents()}
      </div>
    </div>
  );
};

export default EventPage;
