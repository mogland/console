import { useState } from "react"
import { Calendar } from "../Calendar"
import styles from "./index.module.css"

interface DatePickProps {
  value: string
  onChange: (value: string) => void
  calendarStyle?: React.CSSProperties
}

export const DatePick: React.FC<DatePickProps> = ({ value, onChange, calendarStyle }) => {
  const [date, setDate] = useState(value)
  const [show, setShow] = useState(false)

  const handleDateChange = (date: Date) => {
    const newDate = date.toISOString()
    setDate(newDate)
    onChange(newDate)
  }

  return (
    <>
      <input
        className={styles.date}
        type="text"
        name="date"
        placeholder="日期"
        value={date}
        onClick={() => setShow(!show)}
        // onBlur={() => setShow(false)}
      />
      {show && (
        <Calendar
          style={calendarStyle}
          onChange={handleDateChange}
          value={new Date(date)}
        />
      )}
    </>
  )
}