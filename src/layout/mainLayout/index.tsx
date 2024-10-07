"use client";

import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import Logo from "@/components/Logo";
import { CATEGORIES } from "@/constants";
import { ROUTES } from "@/constants/navigation";
import useAuth from "@/hooks/useAuth";
import useFavourite from "@/hooks/useFavourite";
import useLocation from "@/hooks/useLocation";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useMemo } from "react";
import AccountLayout from "../accountLayout";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { isLogged, checkAuth } = useAuth();
  const { getListFavouriteEvents } = useFavourite();
  const { getListProvinces } = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

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

  const isAccountRouter = useMemo(() => {
    if (
      pathname.includes(ROUTES.ACCOUNT.ACCOUNT) ||
      pathname.includes(ROUTES.ACCOUNT.APPLY) ||
      pathname.includes(ROUTES.ACCOUNT.ORGANIZED)
    )
      return true;
    return false;
  }, [pathname]);

  useEffect(() => {
    if (isLogged) {
      getListFavouriteEvents({});
    }
  }, [isLogged]);

  useEffect(() => {
    getListProvinces();
  }, []);

  return (
    <>
      {!isAuthRouter ? <HeaderBar /> : null}
      {isAccountRouter ? <AccountLayout>{children}</AccountLayout> : children}
      <Footer />
    </>
  );
};

export default MainLayout;
