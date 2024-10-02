"use client";

import HeaderBar from "@/components/HeaderBar";
import Logo from "@/components/Logo";
import { CATEGORIES } from "@/constants";
import { Dropdown, MenuProps } from "antd";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderBar />
      {children}
    </>
  );
};

export default MainLayout;
