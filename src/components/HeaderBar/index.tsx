import { Button, Dropdown, Input, MenuProps, Popconfirm } from "antd";
import React, { useCallback } from "react";
import Logo from "../Logo";
import { CATEGORIES } from "@/constants";
import { FaHeart } from "react-icons/fa";
import { COLORS } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/navigation";

const items: MenuProps["items"] = CATEGORIES.map((item) => ({
  label: item.name,
  key: item.value,
}));

const HeaderBar = () => {
  const { isLogged } = useAuth();

  const router = useRouter();

  const renderFavouriteButton = useCallback(() => {
    if (!isLogged)
      return (
        <Popconfirm
          title="Bạn chưa đăng nhập"
          description="Hãy đăng nhập để có thể vào mục yêu thích"
          cancelText="Hủy"
          okText="Đăng nhập"
          showCancel={false}
          okType="link"
        >
          <Button
            type="link"
            icon={<FaHeart size={32} color={COLORS.red[1]} />}
          ></Button>
        </Popconfirm>
      );
    return (
      <Button
        type="link"
        icon={<FaHeart size={32} color={COLORS.red[1]} />}
      ></Button>
    );
  }, [isLogged]);

  const renderUnauth = useCallback(() => {
    return (
      <div className="flex gap-4">
        <Button size="large" onClick={() => router.push(ROUTES.AUTH.SIGNUP)}>
          Đăng ký
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={() => router.push(ROUTES.AUTH.LOGIN)}
        >
          Đăng nhập
        </Button>
      </div>
    );
  }, []);

  return (
    <div className="flex gap-6 px-4 py-5 items-center shadow-lg shadow-slate-200 sticky top-0 bg-white z-50">
      <Logo />
      <Dropdown menu={{ items }}>
        <p className="cursor-pointer hover:text-blue-400">Danh mục</p>
      </Dropdown>
      <div className="flex-1">
        <Input.Search size="large" placeholder="Tìm kiếm sự kiện" enterButton />
      </div>
      {renderFavouriteButton()}
      {renderUnauth()}
    </div>
  );
};

export default HeaderBar;
