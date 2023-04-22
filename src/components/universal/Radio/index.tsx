import { useState, useEffect } from "react"
import { ModalBody } from "../Modal"
import styles from "./index.module.css"

export interface RadioProps {
  selected?: any
  value: {
    name: string
    key: string
    value: any
  }[]
  onChange: (checked: any) => void
  label?: string
  [key: string]: any
}

/**
 * A radio component 单选框组件
 * @param props
 */
export const Radio = (props: RadioProps) => {
  const { selected, value, onChange, label, ...rest } = props
  const [checked, setChecked] = useState<any>(selected)

  useEffect(() => {
    setChecked(selected)
  }, [selected])

  const handleChange = (e: any) => {
    const { value } = e.target
    setChecked(value)
    onChange(value)
  }

  return (
    <>
      {label && <ModalBody>{label}</ModalBody>}
      <div className={styles.radio}>
        {value.map((item) => (
          <label key={item.key} className={styles.label}>
            <input
              type="radio"
              className={styles.input}
              checked={checked === item.value}
              value={item.value}
              onChange={handleChange}
              {...rest}
            />
            <span className={styles.check} />
            <span className={styles.name}>{item.name}</span>
          </label>
        ))}
      </div>
    </>
  )
}