import type { SwitchProps } from "@components/universal/Toggle";
import { Toggle } from "@components/universal/Toggle";
import type { RadioProps } from "@components/universal/Radio";
import { Radio } from "@components/universal/Radio";
import type { ColorProps } from "@components/universal/Color";
import { Color } from "@components/universal/Color";
import { ModalBody } from "@components/universal/Modal";
import type { SelectProps } from "./ThemeSelect";
import { Select } from "./ThemeSelect";
import { Input, InputProps } from "@components/ui/input";
import { TextareaProps } from "@components/ui/textarea";
import { Checkbox } from "@components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { ThemeTextarea } from "./ThemeTextarea";
import { Label } from "@components/ui/label";

const components = {
  input: (props: InputProps) => <Input {...props} className="font-mono" />,
  select: (props: SelectProps) => <Select {...props} />,
  textarea: (
    props: TextareaProps & {
      label: string;
    }
  ) => <ThemeTextarea {...props} />,
  checkbox: (props: CheckboxProps) => <Checkbox {...props} />,

  switch: (props: SwitchProps) => <Toggle {...props} />,
  radio: (props: RadioProps) => <Radio {...props} />,
  color: (props: ColorProps) => <Color {...props} />,
};

export const ThemeComponent = (mapping: {
  type: string;
  [key: string]: any;
}) => {
  if (!components[mapping.type]) {
    return (
      <>
        <Label>{mapping.label}</Label>
        <p className="text-red-500">
          ⚠️ 未找到主题配置文件指定的 <code>{`\`<${mapping.type} />\``}</code> 组件，请检查配置或后台版本
        </p>
      </>
    );
  }
  return components[mapping.type](mapping);
};
