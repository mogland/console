import {
  ArrowLeft,
  ArrowRight,
  Left,
  Right,
  ToLeft,
  ToRight,
} from "@icon-park/react";
import clsx from "clsx";
import { useState } from "react";
import { getMonthDays, getFirstDay } from "@utils/date";
import styles from "./index.module.css";
import { motion } from "framer-motion";

interface CalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  [key: string]: any;
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const [date, setDate] = useState(value);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [monthDays, setMonthDays] = useState(getMonthDays(year, month));
  const [hours, setHours] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());
  const [firstDay, setFirstDay] = useState(getFirstDay(year, month));
  const [showTime, setShowTime] = useState(false);

  const handleDateChange = (date: Date) => {
    setDate(date);
    onChange(date);
  };

  const handleYearChange = (year: number) => {
    if (year === 0) {
      return;
    }
    setYear(year);
    setMonthDays(getMonthDays(year, month));
    setFirstDay(getFirstDay(year, month));
    handleDateChange(
      new Date(year, month - 1, date.getDate(), hours, minutes, seconds)
    );
  };

  const handleMonthChange = (month: number) => {
    if (month === 0) {
      handleYearChange(year - 1);
      setMonth(12);
      return;
    }
    setMonth(month);
    setMonthDays(getMonthDays(year, month));
    setFirstDay(getFirstDay(year, month));
    handleDateChange(
      new Date(year, month - 1, date.getDate(), hours, minutes, seconds)
    );
  };

  const handleHoursChange = (hours: number) => {
    if (hours === 24) {
      handleDateChange(
        new Date(year, month, date.getDate() + 1, 0, minutes, seconds)
      );
      setHours(0);
      return;
    }
    setHours(hours);
    handleDateChange(
      new Date(year, month - 1, date.getDate(), hours, minutes, seconds)
    );
  };

  const handleMinutesChange = (minutes: number) => {
    if (minutes === 60) {
      handleHoursChange(hours + 1);
      setMinutes(0);
      return;
    }
    setMinutes(minutes);
    handleDateChange(
      new Date(year, month - 1, date.getDate(), hours, minutes, seconds)
    );
  };

  const handleSecondsChange = (seconds: number) => {
    if (seconds === 60) {
      handleMinutesChange(minutes + 1);
      setSeconds(0);
      return;
    }
    setSeconds(seconds);
    handleDateChange(
      new Date(year, month - 1, date.getDate(), hours, minutes, seconds)
    );
  };

  const TimePicker = () => {
    return (
      <div className={clsx(styles.time)}>
        <div className={styles.timeItem}>
          <button
            className={styles.btn}
            onClick={() => handleHoursChange(hours - 1)}
          >
            <ToLeft />
          </button>
          <button
            className={styles.btn}
            onClick={() => handleMinutesChange(minutes - 1)}
          >
            <ArrowLeft />
          </button>
          <button
            className={styles.btn}
            onClick={() => handleSecondsChange(seconds - 1)}
          >
            <Left />
          </button>
          <span>{hours}</span>
          <span>&nbsp;时</span>
          <span>&nbsp;</span>
          <span>{minutes}</span>
          <span>&nbsp;分</span>
          <span>&nbsp;</span>
          <span>{seconds}</span>
          <span>&nbsp;秒</span>
          <button
            className={styles.btn}
            onClick={() => handleSecondsChange(seconds + 1)}
          >
            <Right />
          </button>
          <button
            className={styles.btn}
            onClick={() => handleMinutesChange(minutes + 1)}
          >
            <ArrowRight />
          </button>
          <button
            className={styles.btn}
            onClick={() => handleHoursChange(hours + 1)}
          >
            <ToRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendar} {...rest}>
      {showTime ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <TimePicker />
        </motion.div>
      ) : null}
      <div className={styles.previewDate}>
        <span>{date.toISOString().split("T")[0]}</span>
        <span
          className={clsx({ [styles.active]: showTime })}
          onClick={() => setShowTime(!showTime)}
        >{`${hours}:${minutes}:${seconds}`}</span>
      </div>
      <div className={styles.header}>
        <div className={styles.yearAndMonth}>
          <button
            className={styles.btn}
            onClick={() => handleYearChange(year - 1)}
          >
            <ArrowLeft />
          </button>
          <button
            className={styles.btn}
            onClick={() => handleMonthChange(month - 1)}
            style={{ marginRight: "10px" }}
          >
            <Left />
          </button>
          <span>{year}</span>
          <span>年</span>
          <span>{month}</span>
          <span>月</span>
          <button
            className={styles.btn}
            onClick={() => handleMonthChange(month + 1)}
            style={{ marginLeft: "10px" }}
          >
            <Right />
          </button>
          <button
            className={styles.btn}
            onClick={() => handleYearChange(year + 1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>
          <div className={styles.week}>
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
          </div>
          <div className={styles.days}>
            {Array.from({ length: firstDay }).map((_, index) => (
              <span key={index} />
            ))}
            {Array.from({ length: monthDays }).map((_, index) => {
              const day = index + 1;
              const _date = new Date(
                year,
                month - 1,
                day,
                hours,
                minutes,
                seconds
              );
              return (
                <span
                  key={index}
                  className={clsx(
                    styles.day,
                    day === date.getDate() && styles.current
                  )}
                  onClick={() => handleDateChange(_date)}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
