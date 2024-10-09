"use client";

import FormLayout, { FormElement } from "@/components/FormLayout";
import { CATEGORIES } from "@/constants";
import useLocation from "@/hooks/useLocation";
import { FormElementType } from "@/utils/enum";
import React, { useMemo } from "react";

const CreateEventPage = () => {
  const { provinces, districts, wards, getListDistricts, getListWards } =
    useLocation();
  const createEventLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        type: FormElementType.GRID,
        elements: [
          {
            type: FormElementType.INPUT,
            name: "name",
            label: "Tên sự kiện",
            required: true,
            placeholder: "Nhập tên sự kiện",
            rules: [
              { required: true, message: "Tên sự kiện không được bỏ trống" },
            ],
          },
        ],
      },
      {
        type: FormElementType.TEXTAREA,
        name: "description",
        label: "Mô tả",
        required: true,
        placeholder: "Mô tả sự kiện",
        rules: [
          { required: true, message: "Mô tả sự kiện không được bỏ trống" },
        ],
      },
      {
        type: FormElementType.GRID,
        elements: [
          {
            type: FormElementType.DATE,
            name: "startTime",
            label: "Thời gian bắt đầu",
            placeholder: "Chọn thời gian",
            required: true,
            rules: [
              {
                required: true,
                message: "Thời gian bắt đầu không được bỏ trống",
              },
            ],
            fieldProps: {
              showTime: true,
            },
          },
          {
            type: FormElementType.DATE,
            name: "endTime",
            label: "Thời gian kết thúc",
            placeholder: "Chọn thời gian",
            required: true,
            rules: [
              {
                required: true,
                message: "Thời gian kết thúc không được bỏ trống",
              },
            ],
            fieldProps: {
              showTime: true,
            },
          },
          {
            type: FormElementType.SELECT,
            name: "provinceId",
            label: "Tỉnh/Thành phố",
            options: provinces.map((item) => ({
              label: item.name,
              value: item.id,
            })),
            placeholder: "Chọn tỉnh thành",
            fieldProps: {
              onChange: (value: any) => getListDistricts(value),
            },
            resetName: ["districtId", "wardId"],
            required: true,
            rules: [
              { required: true, message: "Tỉnh thành không được bỏ trống" },
            ],
          },
          {
            type: FormElementType.SELECT,
            name: "districtId",
            label: "Quận huyện",
            options: districts.map((item) => ({
              label: item.name,
              value: item.id,
            })),
            placeholder: "Chọn quận huyện",
            fieldProps: {
              onChange: (value: any) => getListWards(value),
            },
            resetName: ["wardId"],
            required: true,
            rules: [
              { required: true, message: "Quận huyện không được bỏ trống" },
            ],
          },
          {
            type: FormElementType.SELECT,
            name: "wardId",
            label: "Xã phường",
            options: wards.map((item) => ({
              label: item.name,
              value: item.id,
            })),
            placeholder: "Chọn xã phường",
            required: true,
            rules: [
              { required: true, message: "Xã phường không được bỏ trống" },
            ],
          },
          {
            type: FormElementType.INPUT,
            name: "address",
            label: "Địa chỉ",
            placeholder: "Địa chỉ",
            required: true,
            rules: [{ required: true, message: "Địa chỉ không được bỏ trống" }],
          },
          {
            type: FormElementType.CHECKBOX,
            name: "needRegister",
            label: "Cần đăng ký ( Người dùng cần đăng ký trước )",
          },
        ],
      },
      {
        type: FormElementType.GRID,
        elements: [
          {
            type: FormElementType.INPUT,
            name: "totalSlot",
            label: "Số lượng tối đa",
            required: true,
            placeholder: "Nhập số lượng tối đa",
            rules: [
              { required: true, message: "Số lượng không được để trống" },
              { pattern: /^[0-9]+$/, message: "Số lượng phải là số" },
            ],
          },
          {
            type: FormElementType.INPUT,
            name: "ticketPrice",
            label: "Giá vé(điền 0 nếu miễn phí)",
            required: true,
            placeholder: "Nhập giá vé",
            rules: [
              { required: true, message: "Giá vé không được để trống" },
              { pattern: /^[0-9]+$/, message: "Giá vé phải là số" },
            ],
          },
          {
            type: FormElementType.SELECT,
            name: "categoryIds",
            label: "Danh mục",
            placeholder: "Chọn danh mục",
            required: true,
            rules: [
              { required: true, message: "Danh mục không được bỏ trống" },
            ],
            options: CATEGORIES.map((item) => ({
              label: item.name,
              value: item.value,
            })),
          },
        ],
      },
      {
        type: FormElementType.UPLOAD_MULTIPLE,
        name: "images",
        label: "Hình ảnh",
        required: true,
        rules: [{ required: true, message: "Hình ảnh không được bỏ trống" }],
      },
    ];
    return layout;
  }, [provinces, districts, wards]);

  return (
    <div className="px-40 py-10">
      <FormLayout
        formLayout={createEventLayout}
        submitText="Tạo sự kiện"
        buttonClassname="w-[20%]"
      />
    </div>
  );
};

export default CreateEventPage;
