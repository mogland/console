import type { SelectsProps } from "@components/universal/Select";
import { Selects } from "@components/universal/Select";
import type { InputInterface, TextareaProps } from "@pages/Write/Input";
import { Textarea , Input } from "@pages/Write/Input";

const components = {
  input: (props: InputInterface) => <Input {...props} className="font-mono" />,
  select: (props: SelectsProps) => <Selects {...props} />,
  textarea: (props: TextareaProps) => <Textarea {...props} className="font-mono h-24" />
}

export const ThemeComponent = (mapping: { type: string, [key: string]: any }) => {
  return components[mapping.type](mapping);
}