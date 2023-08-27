import clsx from "clsx";
import { ModalBody } from "@components/universal/Modal";
import styles from "./index.module.css";
export interface InputInterface {
  label: string;
  value: string;
  type?: HTMLInputElement["type"];
  onChange?: (value: string) => void;
  oneLine?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  width?: string;
  [key: string]: any;
}

export const Input: React.FC<InputInterface> = ({
  label,
  value,
  onChange,
  oneLine,
  type,
  disabled,
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx({ [styles.toggleGroup]: oneLine }, className)}>
      <span className={clsx({ [styles.toggleGroupTitle]: oneLine })}>
        <ModalBody>{label}</ModalBody>
      </span>
      <input
        {...props}
        disabled={disabled}
        className={styles.passwordInput}
        type={type || "text"}
        value={value}
        style={{ width: props.width }}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      {children}
    </div>
  );
};