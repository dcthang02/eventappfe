"use client";

import { ROUTES } from "@/constants/navigation";
import { Button, Menu, MenuProps } from "antd";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useCallback, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";
import { VscThreeBars } from "react-icons/vsc";
import { MenuInfo } from "rc-menu/lib/interface";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: ROUTES.ACCOUNT.ACCOUNT,
    label: "Hồ sơ",
    icon: <CiUser size={24} />,
  },
  {
    key: ROUTES.ACCOUNT.APPLY,
    label: "Lịch sử tham gia",
    icon: <BsClockHistory size={24} />,
  },
  {
    key: ROUTES.ACCOUNT.ORGANIZED,
    label: "Lịch sử tổ chức",
    icon: <GoOrganization size={24} />,
  },
];

const AccountLayout = ({ children }: { children: ReactNode }) => {
  const [showSideBar, setShowSidebar] = useState(true);

  const router = useRouter();
  const pathName = usePathname();

  const handleChangeNavigation = useCallback((info: MenuInfo) => {
    router.push(info.key);
  }, []);

  return (
    <div className="flex min-h-[100vh]">
      <div
        className={clsx("overflow-x-hidden", showSideBar ? "w-[260px]" : "w-0")}
        style={{
          transition: "width 0.5s ease",
        }}
      >
        <div className="w-[260px] py-4 pl-3">
          <Menu
            mode="vertical"
            items={items}
            selectedKeys={[pathName]}
            onClick={handleChangeNavigation}
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        <Button
          type="text"
          icon={<VscThreeBars size={32} />}
          onClick={() => setShowSidebar(!showSideBar)}
        />
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
