import clsx from "clsx"
import { useState } from "react"
import { Button } from "../../components/universal/Button"
import styles from "./index.module.css"
interface FieldsProps {
  value: {
    [key: string]: any
  }
  onChange: (value: { [key: string]: any }) => void
}

export const Fields: React.FC<FieldsProps> = ({ value, onChange }) => {
  const [fields, setFields] = useState<{ [key: string]: any }>(value || {})
  const [fieldName, setFieldName] = useState("")

  const handleAdd = () => {
    setFields({ ...fields, [fieldName]: "" })
    setFieldName("")
  }

  const handleRemove = (key: string) => {
    const newFields = { ...fields }
    delete newFields[key]
    setFields(newFields)
    onChange(newFields)
  }

  const handleChange = (key: string, value: string, newKey?: string) => {
    if (newKey) {
      const newFields = { ...fields }
      delete newFields[key]
      newFields[newKey] = value;
      setFields(newFields)
      onChange(newFields)
      return;
    }
    const newFields = { ...fields }
    newFields[key] = value;
    setFields(newFields)
    onChange(newFields)
  }

  const handleFieldName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldName(e.target.value)
  }

  return (
    <div className={styles.fields}>
      {Object.keys(fields).map((field) => (
        <div key={field} className={styles.field}>
          <input
            className={styles.passwordInput}
            type="text"
            placeholder="字段名"
            value={field}
            disabled
            onChange={(e) => handleChange(field, e.target.value, field)}
            style={{ marginRight: "20px" }}
          />
          <input
            className={styles.passwordInput}
            type="text"
            placeholder="字段值"
            value={fields[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
          <Button
            className={styles.removeButton}
            onClick={() => handleRemove(field)}
          >
            删除
          </Button>
        </div>
      ))}
      <div>
        <input
          className={clsx(styles.passwordInput, styles.fieldName)}
          type="text"
          placeholder="新字段名"
          value={fieldName}
          onChange={handleFieldName}
        />
        <Button onClick={handleAdd}
          className={styles.addButton}
        >添加</Button>
      </div>
    </div>
  )
}
