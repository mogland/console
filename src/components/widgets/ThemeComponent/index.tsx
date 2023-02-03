import { ModalBody } from "@components/universal/Modal";
import type { SelectsProps } from "@components/universal/Select";
import { Selects } from "@components/universal/Select";
import type { SwitchProps} from "@components/universal/Toggle";
import { Toggle } from "@components/universal/Toggle";
import type { InputInterface, TextareaProps } from "@pages/Write/Input";
import { Textarea , Input } from "@pages/Write/Input";

const components = {
  input: (props: InputInterface) => <Input {...props} className="font-mono" />,
  select: (props: SelectsProps) => <Selects {...props} />,
  textarea: (props: TextareaProps) => <Textarea {...props} className="font-mono h-24" />,
  switch: (props: SwitchProps) => <Toggle {...props} />,
  checkbox: (props: any) => (<ModalBody>暂未实现此组件</ModalBody>),
  radio: (props: any) => (<ModalBody>暂未实现此组件</ModalBody>),
  slider: (props: any) => (<ModalBody>暂未实现此组件</ModalBody>),
  color: (props: any) => (<ModalBody>暂未实现此组件</ModalBody>),
}

export const ThemeComponent = (mapping: { type: string, [key: string]: any }) => {
  return components[mapping.type](mapping);
}