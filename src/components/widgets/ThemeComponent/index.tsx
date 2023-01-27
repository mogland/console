import type { SelectsProps } from "@components/universal/Select";
import { Selects } from "@components/universal/Select";
import type { InputInterface } from "@pages/Write/Input";
import { Input } from "@pages/Write/Input";

const components = {
  input: (props: InputInterface) => <Input {...props} />,
  selects: (props: SelectsProps) => <Selects {...props} />
}

export const ThemeComponent = (mapping: { type: string, [key: string]: any }) => {
  return components[mapping.type](mapping);
}