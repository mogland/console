import type { TextareaProps } from "@components/ui/textarea";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";

export const ThemeTextarea: React.FC<
  TextareaProps & {
    label: string;
  }
> = (props) => {
  return (
    <div className="flex flex-col mb-4">
      <Label className="mb-2">{props.label}</Label>
      <Textarea {...props} className="font-mono h-24" />
    </div>
  );
};
