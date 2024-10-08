"use client";

import FormLayout, { FormElement } from "@/components/FormLayout";
import { FormElementType } from "@/utils/enum";
import { Tabs } from "antd";
import clsx from "clsx";
import React, { useMemo, useState } from "react";

const AccountPage = () => {
  const accountLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        type: FormElementType.UPLOAD,
        name: "avatar",
      },
      {
        type: FormElementType.INPUT,
        name: "fullname",
        label: "Họ và tên",
      },
      {
        type: FormElementType.UPLOAD,
        name: "testss",
        label: "s",
      },
    ];
    return layout;
  }, []);

  const initialValues = useMemo(() => {
    return {
      test: 1,
    };
  }, []);

  return (
    <div>
      <FormLayout
        formLayout={accountLayout}
        onSubmit={(data: any) => {
          console.log(data);
        }}
        initialValues={initialValues}
      />
    </div>
  );
};

export default AccountPage;
