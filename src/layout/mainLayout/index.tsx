"use client";

import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import Logo from "@/components/Logo";
import { CATEGORIES } from "@/constants";
import { ROUTES } from "@/constants/navigation";
import useAuth from "@/hooks/useAuth";
import useFavourite from "@/hooks/useFavourite";
import { Dropdown, MenuProps } from "antd";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useMemo } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { isLogged } = useAuth();
  const { getListFavouriteEvents } = useFavourite();

  const pathname = usePathname();

  const isAuthRouter = useMemo(() => {
    if (
      pathname.includes(ROUTES.AUTH.LOGIN) ||
      pathname.includes(ROUTES.AUTH.SIGNUP) ||
      pathname.includes(ROUTES.AUTH.FORGOT_PASSWORD)
    )
      return true;
    return false;
  }, [pathname]);

  useEffect(() => {
    if (isLogged) {
      getListFavouriteEvents({});
    }
  }, [isLogged]);

  return (
    <>
      {!isAuthRouter ? <HeaderBar /> : null}
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
