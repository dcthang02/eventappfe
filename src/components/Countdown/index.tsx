import React, { useState, useEffect, FC } from "react";

type Props = {
  initialSeconds?: number;
  onEndTime?: () => void;
};

const Countdown: FC<Props> = ({ initialSeconds = 120, onEndTime }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      if (seconds === 0) {
        onEndTime?.();
      }
    }
  }, [seconds]);

  return <span className="text-blue-600 font-medium">{seconds}s</span>;
};

export default Countdown;
