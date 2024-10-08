"use client";

import FormLayout, { FormElement } from "@/components/FormLayout";
import { COLORS } from "@/constants/colors";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";

import LoginImage from "@/assets/login.png";
import { FormElementType } from "@/utils/enum";
import { ROUTES } from "@/constants/navigation";
import Countdown from "@/components/Countdown";

type SignupFieldType = {
  email: string;
  password: string;
};

type OtpFieldType = {
  code: string;
};

const SignupPage = () => {
  const [requestSuccess, setRequestSuccess] = useState(false);
  const signupFormLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        type: FormElementType.INPUT,
        name: "fullname",
        label: "Họ và tên",
        required: true,
        rules: [{ required: true, message: "Tên không được bỏ trống" }],
        placeholder: "VD: Nguyễn Văn An",
      },
      {
        type: FormElementType.INPUT,
        name: "phone",
        label: "Số điện thoại",
        required: true,
        rules: [
          { required: true, message: "Số điện thoại không được bỏ trống" },
          {
            pattern: /^[0-9]{10}$/,
            message: "Số điện thoại không đúng định dạng",
          },
        ],
        placeholder: "VD: 0123456789",
      },
      {
        type: FormElementType.INPUT,
        name: "email",
        label: "Email (Dùng để đăng nhập)",
        required: true,
        rules: [
          { required: true, message: "Email không được bỏ trống" },
          { type: "email", message: "Email không đúng định dạng" },
        ],
        placeholder: "Email. VD: user@gmail.com",
      },
      {
        type: FormElementType.PASSWORD,
        name: "password",
        label: "Mật khẩu",
        required: true,
        rules: [{ required: true, message: "Mật khẩu không được bỏ trống" }],
        placeholder: "VD: abc123456",
      },
    ];
    return layout;
  }, []);

  const otpFormLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        name: "code",
        type: FormElementType.INPUT,
        required: true,
        placeholder: "VD: 123456",
        rules: [
          { required: true, message: "Mã Otp không được bỏ trống" },
          {
            pattern: /^[0-9]{6}$/,
            message: "Mã Otp phải gồm 6 chữ số",
          },
        ],
      },
    ];
    return layout;
  }, []);

  const handleSubmit = useCallback((values: SignupFieldType) => {
    console.log(values);
    setRequestSuccess(true);
  }, []);

  const handleSubmitOtp = useCallback((values: OtpFieldType) => {
    console.log(values);
    setRequestSuccess(false);
  }, []);

  const renderSignup = useCallback(() => {
    return (
      <>
        <h2 className="text-3xl font-semibold text-slate-800">
          Đăng ký và bắt đầu tham gia sự kiện thú vị
        </h2>
        <div className="w-full">
          <FormLayout
            formLayout={signupFormLayout}
            submitText="Đăng ký"
            onSubmit={handleSubmit}
          />
        </div>
        <Divider style={{ borderColor: COLORS.gray[0] }}>
          <p className="text-slate-600">Các tùy chọn khác</p>
        </Divider>

        <div className="w-full bg-slate-200 px-8 py-4 flex flex-col gap-3">
          <p>
            Bạn đã{" "}
            <Link href={"/"} className="text-blue-500">
              Quên mật khẩu
            </Link>
            ?
          </p>
          <p>
            Bạn đã có tài khoản?{" "}
            <Link href={ROUTES.AUTH.LOGIN} className="text-blue-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </>
    );
  }, [handleSubmit]);

  const renderOtpVerification = useCallback(() => {
    return (
      <div className="w-full">
        <p>
          Chúng tôi đã gửi mã Otp gồm 6 chữ số đến hòm thư của bạn. Vui lòng
          kiểm tra hòm thư
        </p>
        <p>
          Mã Otp sẽ kết thúc trong <Countdown initialSeconds={120} />
        </p>
        <FormLayout formLayout={otpFormLayout} submitText="Xác nhận" />
      </div>
    );
  }, [handleSubmitOtp]);

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 flex items-center justify-center">
        <Image src={LoginImage} alt="" />
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-4 items-center justify-center h-full px-32 py-20">
          {requestSuccess ? renderOtpVerification() : renderSignup()}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
