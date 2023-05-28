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

export const Input: React.FC<InputInterface> = ({ label, value, onChange, oneLine, type, disabled, children, className, ...props }) => {
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

export interface TextareaProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

export const Textarea: React.FC<TextareaProps> = ({ label, value, onChange, placeholder, className, ...rest }) => {
  return (
    <>
      <ModalBody>{label}</ModalBody>
      <textarea
        {...rest}
        className={clsx(styles.summary, className)}
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
