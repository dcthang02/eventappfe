"use client";

import Countdown from "@/components/Countdown";
import FormLayout, { FormElement } from "@/components/FormLayout";
import Logo from "@/components/Logo";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/navigation";
import { FormElementType } from "@/utils/enum";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

type ForgotPasswordFieldType = {
  email: string;
};

const ForgotPasswordPage = () => {
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  const router = useRouter();

  const forgotFormLayout = useMemo(() => {
    const layout: FormElement[] = [
      {
        type: FormElementType.INPUT,
        name: "email",
        label: "Email",
        placeholder: "VD: user@gmail.com",
        required: true,
        rules: [
          { required: true, message: "Email không được bỏ trống" },
          { type: "email", message: "Email không đúng định dạng" },
        ],
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

  const handleSubmit = useCallback((data: ForgotPasswordFieldType) => {
    console.log(data);
    setIsRequestSuccess(true);
  }, []);

  const handleGoBack = useCallback(() => {
    setIsRequestSuccess(false);
    if (!isRequestSuccess)
      if (window.history?.length && window.history.length > 2) {
        router.back();
      } else {
        router.replace(ROUTES.HOME);
      }
  }, [isRequestSuccess]);

  const renderOtpVerify = useCallback(() => {
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
  }, []);

  return (
    <div className="h-[100vh] flex flex-col">
      <div className="px-24 py-7 shadow-md flex gap-5 items-center">
        <Logo size="medium" />
        <p className="text-blue-500 font-semibold text-xl">
          Khôi phục mật khẩu
        </p>
      </div>

      <div className="flex justify-center flex-1 items-center">
        <div className="shadow-lg w-[35%] p-4">
          <Button
            type="text"
            icon={<BiArrowBack size={32} color={COLORS.blue[2]} />}
            onClick={handleGoBack}
          />
          {isRequestSuccess ? (
            renderOtpVerify()
          ) : (
            <>
              <p>
                Chúng tôi sẽ gửi mã Otp tới hòm thư của bạn. Vui lòng nhập email
              </p>
              <FormLayout
                formLayout={forgotFormLayout}
                submitText="Gửi mã"
                onSubmit={handleSubmit}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
