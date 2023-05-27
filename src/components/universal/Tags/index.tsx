import { Close, Plus } from "@icon-park/react";
import type { PropsWithChildren, PropsWithRef } from "react";
import { forwardRef, useRef, useState } from "react";
import { useKeyPressEvent } from "react-use";
import { useSnapshot } from "valtio";
import { server } from "@states/app";
import styles from "./index.module.css";

interface TagsProp {
  tags: string[];
  setTags: (tags: string[]) => void;
  autoComplete?: boolean;
  tagStyles?: React.CSSProperties;
}

export const Tags: React.FC<TagsProp> = (props) => {
  const { tags, setTags, tagStyles } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const input = "input";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleConfirmWithAutoComplete = (value?: string) => {
    if (
      (inputValue && tags.indexOf(inputValue) === -1) ||
      (value && tags.indexOf(value) === -1)
    ) {
      setTags([...tags, value || inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = inputVisible ? [...tags, input] : tags;

  return (
    <div className={styles.tags}>
      {forMap.map((tag, index) => {
        if (inputVisible && index === tags.length) {
          return (
            <Input
              styles={tagStyles}
              ref={inputRef}
              key={`${tag}-${index}`}
              style={{ width: 78 }}
              defaultValue={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
              onAutoComplete={handleConfirmWithAutoComplete}
              autoComplete={props.autoComplete}
            />
          );
        }

        return (
          <Tag closable key={`${tag}-${index}`} onClose={() => handleClose(tag)} styles={tagStyles}>
            {tag}
          </Tag>
        );
      })}
      {!inputVisible && (
        <NewTag onClick={showInput} className={styles.newTag} styles={tagStyles}>
          <Plus /> New Tag
        </NewTag>
      )}
    </div>
  );
};

export const Input = forwardRef<
  HTMLInputElement,
  PropsWithRef<PropsWithChildren & React.HTMLAttributes<HTMLInputElement>> & {
    onPressEnter?: () => void;
    onAutoComplete?: (value?: string) => void;
    autoComplete?: boolean;
    styles?: React.CSSProperties;
  }
>((props, ref) => {
  const tags = useSnapshot(server).tags;
  const { onPressEnter, autoComplete, ...rest } = props;
  useKeyPressEvent("Enter", onPressEnter);

  return (
    <div className={styles.suggestContainer}>
      <input className={styles.input} ref={ref} {...rest} style={props.styles} />
      <div className={styles.suggest}>
        {autoComplete && tags
          .map((tag) => (
            <div
              style={props.styles}
              key={tag.name}
              className={styles.input}
              onMouseDown={() => {
                // use mousedown instead of click to prevent input blur
                props.onAutoComplete?.(tag.name);
              }}
            >
              {tag.name}
            </div>
          ))
          .sort((a, b) => b.props.children.length - a.props.children.length)}
      </div>
    </div>
  );
});

interface TagProps {
  closable?: boolean;
  onClose?: () => void;
  styles?: React.CSSProperties;
}

export const Tag: React.FC<PropsWithChildren & TagProps> = (props) => {
  const { children, closable, onClose } = props;
  return (
    <div className={styles.tag} style={props.styles}>
      <span>{children}</span>
      {closable && (
        <span className={styles.close} onClick={onClose}>
          <Close />
        </span>
      )}
    </div>
  );
};

const NewTag: React.FC<
  PropsWithChildren & React.HTMLAttributes<HTMLDivElement> & { styles?: React.CSSProperties }
> = (props) => {
  const { onClick, children, styles } = props;
  return (
    <div onClick={onClick} {...props} style={styles}>
      {children}
    </div>
  );
};
