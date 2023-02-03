import type { CheckBoxProps } from "@components/universal/CheckBox";
import { CheckBox } from "@components/universal/CheckBox";
import type { SelectsProps } from "@components/universal/Select";
import { Selects } from "@components/universal/Select";
import type { SwitchProps} from "@components/universal/Toggle";
import { Toggle } from "@components/universal/Toggle";
import type { InputInterface, TextareaProps } from "@pages/Write/Input";
import { Textarea , Input } from "@pages/Write/Input";
import type { RadioProps } from "@components/universal/Radio";
import { Radio } from "@components/universal/Radio";
import type { ColorProps } from "@components/universal/Color";
import { Color } from "@components/universal/Color";
import { ModalBody } from "@components/universal/Modal";

const components = {
  input: (props: InputInterface) => <Input {...props} className="font-mono" />,
  select: (props: SelectsProps) => <Selects {...props} />,
  textarea: (props: TextareaProps) => <Textarea {...props} className="font-mono h-24" />,
  switch: (props: SwitchProps) => <Toggle {...props} />,
  checkbox: (props: CheckBoxProps) => <CheckBox {...props} />,
  radio: (props: RadioProps) => <Radio {...props} />,
  color: (props: ColorProps) => <Color {...props} />,
}

export const ThemeComponent = (mapping: { type: string, [key: string]: any }) => {
  if (!components[mapping.type]) {
    return (
      <ModalBody>
        {mapping.label}
        <p className="text-red-500">Error: No component found for {`<${mapping.type} />`}</p>
      </ModalBody>
    )
  }
  return components[mapping.type](mapping);
}