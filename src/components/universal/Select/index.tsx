import { Listbox, Transition } from "@headlessui/react";
import { CheckSmall } from "@icon-park/react";
import { ModalBody } from "@components/universal/Modal";
import clsx from "clsx";
import { Fragment, useState } from "react";
import styles from "./index.module.css";

interface Value {
  name: string;
  value: any;
}

export interface SelectsProps {
  value: Value[];
  onChange?: (value: Value) => void;
  selected?: Value | string;
  label?: string;
}

export const Selects: React.FC<SelectsProps> = (props) => {
  const [selected, setSelected] = useState<Value>(
    typeof props.selected === "string" ? {
      name: props.selected,
      value: props.value.find((value) => value.name === props.selected)?.value,
    }
    : props.selected ? props.selected : props.value[0]
  );
  const handleChange = (value: Value) => {
    props.onChange && props.onChange(value);
    setSelected(value);
  };
  return (
    <div className={styles.container}>
      {props.label && <ModalBody>{props.label}</ModalBody>}
      <Listbox defaultValue={selected} onChange={handleChange}>
        <div className={styles.containerInner}>
          <Listbox.Button className={styles.button}>
            <span className={styles.name}>{selected.name}</span>
            <span className={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={styles.menu}>
              {props.value.map((value, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      clsx(styles.menuItem, active ? styles.active : "")
                    }
                    value={value}
                  >
                    {({ selected }) => (
                      <div>
                        {selected && (
                          <span className={styles.icon}>
                            <CheckSmall />
                          </span>
                        )}
                        <span className={styles.name}>{value.name}</span>
                      </div>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
