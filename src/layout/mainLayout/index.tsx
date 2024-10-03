"use client";

import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import Logo from "@/components/Logo";
import { CATEGORIES } from "@/constants";
import useAuth from "@/hooks/useAuth";
import useFavourite from "@/hooks/useFavourite";
import { Dropdown, MenuProps } from "antd";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { isLogged } = useAuth();
  const { getListFavouriteEvents } = useFavourite();
  useEffect(() => {
    if (isLogged) {
      getListFavouriteEvents({});
    }
  }, [isLogged]);

  return (
    <>
      <HeaderBar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
