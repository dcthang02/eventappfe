"use client";

import Image from "next/image";
import React, { useCallback, useMemo } from "react";

import LoginImage from "@/assets/login.png";
import FormLayout, { FormElement } from "@/components/FormLayout";
import { FormElementType } from "@/utils/enum";
import { Divider } from "antd";
import { COLORS } from "@/constants/colors";
import Link from "next/link";
import { ROUTES } from "@/constants/navigation";
import useAuth from "@/hooks/useAuth";

type LoginFieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { loading, login } = useAuth();

  const loginFormLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        type: FormElementType.INPUT,
        name: "email",
        label: "Email",
        required: true,
        rules: [
          { required: true, message: "Email không được bỏ trống" },
          { type: "email", message: "Email không đúng định dạng" },
        ],
        placeholder: "Email. VD: user@gmail.com",
      },
      {
        type: FormElementType.INPUT,
        name: "password",
        label: "Mật khẩu",
        required: true,
        rules: [{ required: true, message: "Mật khẩu không được bỏ trống" }],
        placeholder: "VD: abc123456",
      },
    ];
    return layout;
  }, []);

  const handleSubmit = useCallback((values: LoginFieldType) => {
    login(values);
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 flex items-center justify-center">
        <Image src={LoginImage} alt="" />
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-4 items-center justify-center h-full px-32 py-20">
          <h2 className="text-3xl font-semibold text-slate-800">
            Đăng nhập để tìm kiếm và tham gia các sự kiện yêu thích
          </h2>
          <div className="w-full">
            <FormLayout
              formLayout={loginFormLayout}
              submitText="Đăng nhập"
              onSubmit={handleSubmit}
              submitLoading={loading}
            />
          </div>
          <Divider style={{ borderColor: COLORS.gray[0] }}>
            <p className="text-slate-600">Các tùy chọn khác</p>
          </Divider>

          <div className="w-full bg-slate-200 px-8 py-4 flex flex-col gap-3">
            <p>
              Bạn đã{" "}
              <Link
                href={ROUTES.AUTH.FORGOT_PASSWORD}
                className="text-blue-500"
              >
                Quên mật khẩu
              </Link>
              ?
            </p>
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link href={ROUTES.AUTH.SIGNUP} className="text-blue-500">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
