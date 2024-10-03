import clsx from "clsx";
import React, { FC, useMemo } from "react";

type Props = {
  size?: "default" | "medium" | "large";
};

const Logo: FC<Props> = ({ size = "default" }) => {
  const textSize = useMemo(() => {
    switch (size) {
      case "default":
        return "text-2xl";
        break;
      case "medium":
        return "text-5xl";
      case "large":
        return "text-8xl";
      default:
        break;
    }
  }, [size]);
  return <div className={clsx("font-semibold", textSize)}>Logo</div>;
};

export default Logo;
