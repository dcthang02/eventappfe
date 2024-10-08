"use client";

import FormLayout, { FormElement } from "@/components/FormLayout";
import useLocation from "@/hooks/useLocation";
import { FormElementType } from "@/utils/enum";
import { Divider, Tabs } from "antd";
import clsx from "clsx";
import React, { useMemo, useState } from "react";

const AccountPage = () => {
  const {
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    setProvinceId,
    setDistrictId,
    getListDistricts,
    getListWards,
  } = useLocation();
  const accountLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        type: FormElementType.GRID,
        elements: [
          {
            type: FormElementType.UPLOAD,
            name: "avatar",
            label: "Ảnh đại diện",
          },
        ],
        fieldProps: {
          className: "grid-cols-4",
        },
      },
      {
        type: FormElementType.GRID,
        elements: [
          {
            type: FormElementType.INPUT,
            name: "fullname",
            label: "Họ và tên",
            required: true,
            placeholder: "Họ và tên",
            rules: [{ required: true, message: "Tên không được bỏ trống" }],
          },
          {
            type: FormElementType.INPUT,
            name: "phone",
            label: "Số điện thoại",
            required: true,
            placeholder: "Số điện thoại",
            rules: [
              { required: true, message: "Số điện thoại không được bỏ trống" },
            ],
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
          },
          {
            type: FormElementType.INPUT,
            name: "address",
            label: "Địa chỉ",
            placeholder: "Địa chỉ",
          },
          {
            type: FormElementType.DATE,
            name: "dob",
            label: "Ngày sinh",
            placeholder: "Chọn ngày sinh",
          },
        ],
      },
    ];
    return layout;
  }, [provinces, districts, wards, provinceId, districtId]);

  const changePasswordFormLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        type: FormElementType.PASSWORD,
        name: "password",
        label: "Mật khẩu hiện tại",
        required: true,
        placeholder: "Nhập mật khẩu hiện tại",
        rules: [{ required: true, message: "Mật khẩu không được bỏ trống" }],
      },
      {
        type: FormElementType.PASSWORD,
        name: "newPassword",
        label: "Mật khẩu mới",
        required: true,
        placeholder: "Nhập mật khẩu mới",
        rules: [{ required: true, message: "Mật khẩu không được bỏ trống" }],
      },
      {
        type: FormElementType.PASSWORD,
        name: "CPassword",
        label: "Nhập lại mật khẩu mới",
        required: true,
        placeholder: "Nhập lại mật khẩu mới",
        rules: [{ required: true, message: "Mật khẩu không được bỏ trống" }],
      },
    ];
    return layout;
  }, []);

  const initialValues = useMemo(() => {
    return {
      fullname: "Xin chao",
    };
  }, []);

  return (
    <div className="px-40">
      <FormLayout
        formLayout={accountLayout}
        onSubmit={(data: any) => {
          console.log(data);
        }}
        buttonClassname="w-[30%]"
        submitText="Chỉnh sửa"
        initialValues={initialValues}
      />
      <Divider />
      <p className="py-3 font-semibold">Đổi mật khẩu</p>
      <FormLayout
        formLayout={changePasswordFormLayout}
        buttonClassname="w-[30%]"
        submitText="Đổi mật khẩu"
      />
    </div>
  );
};

export default AccountPage;
