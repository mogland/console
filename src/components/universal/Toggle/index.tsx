import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import styles from "./index.module.css";
import { ModalBody } from "../Modal";

export interface SwitchProps {
  checked?: boolean;
  value?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  [key: string]: any;
}

export const Toggle: React.FC<SwitchProps> = ({
  checked,
  value,
  onChange,
  label,
  ...rest
}) => {
  const [state, setState] = useState(checked || value || false);
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    setState(checked || value || false);
  }, [checked, value]);

  const handleChange = () => {
    setState(!state);
    onChange(!state);
  };

  return (
    <>
      {label && <ModalBody>{label}</ModalBody>}
      <Switch
        {...rest}
        checked={state}
        onChange={handleChange}
        className={clsx(styles.switch, { [styles.active]: state })}
        onMouseDown={() => setEnter(true)}
        onMouseUp={() => setEnter(false)}
        onTouchStart={() => setEnter(true)}
        onTouchEnd={() => setEnter(false)}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={clsx(
            styles.circle,
            { [styles.cirCleActive]: state },
            { [styles.enter]: enter }
          )}
        />
      </Switch>
    </>
  );
};
