import {
  Avatar,
  Button,
  Dropdown,
  Input,
  MenuProps,
  Popconfirm,
  Tooltip,
} from "antd";
import React, { useCallback, useMemo } from "react";
import Logo from "../Logo";
import { CATEGORIES } from "@/constants";
import { FaHeart, FaPlus } from "react-icons/fa";
import { COLORS } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/navigation";
import { BsClockHistory } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MenuInfo } from "rc-menu/lib/interface";

const items: MenuProps["items"] = CATEGORIES.map((item) => ({
  label: item.name,
  key: item.value,
}));

const HeaderBar = () => {
  const { isLogged, profile } = useAuth();

  const router = useRouter();

  const profileDropdown: MenuProps["items"] = useMemo(() => {
    const data: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <div className="flex gap-3 items-center py-2">
            <Avatar src={profile?.imageUrl} size={32} />
            <p className="text-slate-800 font-semibold">{profile?.fullname}</p>
          </div>
        ),
        style: {
          cursor: "default",
        },
      },
      {
        type: "divider",
      },
      {
        label: "Hồ sơ",
        key: ROUTES.ACCOUNT.ACCOUNT,
        icon: <CiUser size={18} />,
        style: { paddingTop: 10, paddingBottom: 10 },
      },
      {
        label: "Lịch sử tham gia",
        key: ROUTES.ACCOUNT.APPLY,
        icon: <BsClockHistory size={18} />,
        style: { paddingTop: 10, paddingBottom: 10 },
      },
      {
        label: "Lịch sử tổ chức",
        key: ROUTES.ACCOUNT.ORGANIZED,
        icon: <GoOrganization size={18} />,
        style: { paddingTop: 10, paddingBottom: 10 },
      },
      {
        type: "divider",
      },
      {
        label: "Đăng xuất",
        key: "logout",
        icon: <RiLogoutBoxLine size={18} />,
        style: { paddingTop: 10, paddingBottom: 10 },
      },
    ];
    return data;
  }, [profile]);

  const handleClickMenuItem = useCallback((info: MenuInfo) => {
    if (info.key === "1") return;
    if (info.key === "logout") {
      // logout
      return;
    }
    router.push(info.key);
  }, []);

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

  const renderAuthorize = useCallback(() => {
    return (
      <div className="flex gap-4">
        <Tooltip title={"Thêm sự kiện"} color={COLORS.blue[1]}>
          <Button
            type="text"
            icon={<FaPlus size={20} color={COLORS.blue[1]} />}
            shape="circle"
            style={{
              boxShadow: `0 4px 8px ${COLORS.white[3]}`,
            }}
            onClick={() => router.push(ROUTES.CREATE_EVENT)}
          />
        </Tooltip>
        <Dropdown
          menu={{ items: profileDropdown, onClick: handleClickMenuItem }}
          trigger={["click"]}
          overlayStyle={{ width: 180 }}
        >
          <Avatar
            src={profile?.imageUrl}
            size={38}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
    );
  }, [profile]);

  return (
    <div className="flex gap-6 px-4 py-5 items-center shadow-lg shadow-slate-200 sticky top-0 bg-white z-50">
      <Logo />
      <Dropdown menu={{ items }}>
        <p className="cursor-pointer hover:text-blue-400">Danh mục</p>
      </Dropdown>
      <Button
        type="text"
        size="large"
        onClick={() => router.push(ROUTES.EVENT)}
      >
        Khám phá sự kiện
      </Button>
      <div className="flex-1">
        <Input.Search size="large" placeholder="Tìm kiếm sự kiện" enterButton />
      </div>
      {renderFavouriteButton()}
      {isLogged ? renderAuthorize() : renderUnauth()}
    </div>
  );
};

export default HeaderBar;
