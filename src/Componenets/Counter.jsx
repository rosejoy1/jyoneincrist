import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "./Counter.css";

dayjs.extend(duration);

const Counter = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = dayjs();
    const target = dayjs(targetDate);
    const diff = target.diff(now);

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const timeLeft = dayjs.duration(diff);
    return {
      days: timeLeft.days(),
      hours: timeLeft.hours(),
      minutes: timeLeft.minutes(),
      seconds: timeLeft.seconds(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-box">
        <div className="flip-clock">
          <span className="countdown-number">{String(timeLeft.days).padStart(3, "0")}</span>
        </div>
        <span className="countdown-label">DAYS</span>
      </div>
      <div className="countdown-box">
        <div className="flip-clock">
          <span className="countdown-number">{String(timeLeft.hours).padStart(2, "0")}</span>
        </div>
        <span className="countdown-label">HRS</span>
      </div>
      <div className="countdown-box">
        <div className="flip-clock">
          <span className="countdown-number">{String(timeLeft.minutes).padStart(2, "0")}</span>
        </div>
        <span className="countdown-label">MINS</span>
      </div>
      <div className="countdown-box">
        <div className="flip-clock">
          <span className="countdown-number">{String(timeLeft.seconds).padStart(2, "0")}</span>
        </div>
        <span className="countdown-label">SECS</span>
      </div>
    </div>
  );
  
};

export default Counter;
