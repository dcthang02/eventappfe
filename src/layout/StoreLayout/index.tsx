"use client";

import store from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreLayout;
