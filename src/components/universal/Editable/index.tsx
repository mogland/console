import { useState, useRef, useEffect } from "react";

export const Editable = (props: {
  onChange: (value: string) => void;
  enable: boolean;
  value: string;
}) => {
  const [value, setValue] = useState(props.value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (props.enable) {
      inputRef.current?.focus();
    }
  }, [props.enable])

  const handleBlur = () => {
    props.onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.onChange(value);
    }
  };

  return (
    <div>
      {props.enable ? (
        <input
          style={{
            textAlign: "center",
            borderRadius: "5px",
            backgroundColor: "var(--background-color)",
          }}
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span>
          {value}
        </span>
      )}
    </div>
  );
};
