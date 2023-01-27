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
  [key: string]: any;
}

export const Input: React.FC<InputInterface> = ({ label, value, onChange, oneLine, type, disabled, children, ...props }) => {
  return (
    <div className={clsx({ [styles.toggleGroup]: oneLine })}>
      <span className={clsx({ [styles.toggleGroupTitle]: oneLine })}>
        <ModalBody>{label}</ModalBody>
      </span>
      <input
        {...props}
        disabled={disabled}
        className={styles.passwordInput}
        type={type || "text"}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      {children}
    </div>
  );
};

export const Textarea: React.FC<{
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  [key: string]: any;
}> = ({ label, value, onChange, placeholder, ...rest }) => {
  return (
    <>
      <ModalBody>{label}</ModalBody>
      <textarea
        {...rest}
        className={styles.summary}
        name={label}
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    </>
  );
};
