import { useState } from "react";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import styles from "./index.module.css";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  [key: string]: any;
}

export const Toggle: React.FC<SwitchProps> = ({
  checked,
  onChange,
  ...rest
}) => {
  const [state, setState] = useState(checked);
  const [enter, setEnter] = useState(false);

  const handleChange = () => {
    setState(!state);
    onChange(!state);
  };

  return (
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
  );
};
