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
import { Textarea, TextareaProps } from "@components/ui/textarea";
import { Checkbox } from "@components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";

const components = {
  input: (props: InputProps) => <Input {...props} className="font-mono" />,
  select: (props: SelectProps) => <Select {...props} />,
  textarea: (props: TextareaProps) => <Textarea {...props} className="font-mono h-24" />,
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
      <ModalBody>
        {mapping.label}
        <p className="text-red-500">
          Error: No component found for {`<${mapping.type} />`}
        </p>
      </ModalBody>
    );
  }
  return components[mapping.type](mapping);
};
