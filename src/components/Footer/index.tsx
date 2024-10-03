import React, { FC } from "react";
import Logo from "../Logo";
import { Button, Divider } from "antd";
import { CgCopyright } from "react-icons/cg";
import Link from "next/link";
import { FaLongArrowAltUp } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <div className="p-24 bg-gradient-to-br from-blue-400 to-blue-200">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between w-full gap-20">
          <Logo size="large" />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            velit. Animi, voluptates sit commodi quo sequi veritatis illo ut
            asperiores accusamus. Fuga fugit sapiente quasi architecto placeat
            nostrum iure consequatur natus a magni, eius neque rem odit
            voluptatum suscipit dolorum!
          </div>
        </div>
        <Divider style={{ borderColor: "white" }} />
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <span>Copy right</span>
            <CgCopyright />
            <span>DCT</span>
          </div>
          <div className="flex gap-5">
            <Link href={"/"}>Điều khoản dịch vụ</Link>
            <Link href={"/"}>Chính sách bảo mật</Link>
          </div>
          <Button
            type="text"
            icon={<FaLongArrowAltUp />}
            iconPosition="end"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            Về đầu trang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
