import styles from "./index.module.css";
import { useState, useEffect } from "react";
import { ModalBody } from "../Modal";

export interface CheckBoxProps {
  selected?: any[]; // 选中的值
  value: {
    // 选项
    name: string;
    key: string;
    value: any;
  }[];
  onChange: (checked: any[]) => void;
  label?: string; // 标签
  [key: string]: any;
}

/**
 * A checkbox component 多选框组件
 */
export const CheckBox = (props: CheckBoxProps) => {
  const { selected = [], value, onChange, label, ...rest } = props;
  const [checked, setChecked] = useState<any>(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  const handleChange = (e: any) => {
    const { checked: _checked, value } = e.target;
    if (_checked) {
      setChecked([...checked, value]);
    }
    if (!_checked) {
      setChecked(checked.filter((item: any) => item !== value));
    }
    onChange(checked);
  };

  return (
    <>
      {label && <ModalBody>{label}</ModalBody>}
      <div className={styles.checkbox}>
        {value.map((item) => (
          <label key={item.key} className={styles.label}>
            <input
              type="checkbox"
              className={styles.input}
              checked={checked.includes(item.value)}
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
  );
};
