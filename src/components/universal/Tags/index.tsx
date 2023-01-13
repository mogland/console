import { Close, Plus } from "@icon-park/react"
import type { PropsWithChildren, PropsWithRef} from "react";
import { forwardRef, useRef, useState } from "react";
import { useKeyPressEvent } from "react-use";
import styles from "./index.module.css"

interface TagsProp {
  tags: string[]
  setTags: (tags: string[]) => void
}

export const Tags: React.FC<TagsProp> = (props) => {
  const { tags, setTags } = props
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const input = "input";
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag)
    setTags(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 10)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue("")
  }

  const forMap = inputVisible ? [...tags, input] : tags

  return (
    <div className={styles.tags}>
      {forMap.map((tag, index) => {
        if (inputVisible && index === tags.length) {
          return (
            <Input
              ref={inputRef}
              key={tag}
              style={{ width: 78 }}
              defaultValue={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )
        }

        return (
          <Tag
            closable
            key={tag}
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        )
      })}
      {!inputVisible && (
        <NewTag onClick={showInput} className={styles.siteTagPlus}>
          <Plus /> New Tag
        </NewTag>
      )}
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, PropsWithRef<PropsWithChildren & React.HTMLAttributes<HTMLInputElement>> & { onPressEnter?: () => void }>((props, ref) => {
  const { ...rest } = props
  const { onPressEnter } = props
  useKeyPressEvent("Enter", onPressEnter)
  return (
    <input
      className={styles.input}
      ref={ref}
      {...rest}
    />
  )
})


interface TagProps {
  closable?: boolean
  onClose?: () => void
}

export const Tag: React.FC<PropsWithChildren & TagProps> = (props) => {
  const { children, closable, onClose } = props
  return (
    <div className={styles.tag}>
      <span>{children}</span>
      {closable && (
        <span className={styles.close} onClick={onClose}>
          <Close />
        </span>
      )}
    </div>
  )
}


const NewTag: React.FC<PropsWithChildren & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { onClick, children } = props
  return (
    <div className={styles.newTag} onClick={onClick}>
      {children}
    </div>
  )
}
