import styles from "./index.module.css"
import { ModalBody } from "../Modal";

export interface ColorProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
}

export const Color = (props: ColorProps) => {
  const { value, onChange, label } = props;
  return (
    <div className={styles.container}>
      {label && <ModalBody>{label}</ModalBody>}
      <input
        type="color"
        className={styles.color}
        defaultValue={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}