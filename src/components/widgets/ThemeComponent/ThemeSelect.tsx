import { Select as UISelect, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@components/ui/select";

export interface SelectProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  data: {
    label: string;
    value: string;
  }[];
}

export const Select: React.FC<SelectProps> = (props) => (
  <UISelect
    value={props.value}
    onValueChange={props.onChange}
  >
    <SelectTrigger className="bg-[var(--background-color)]">
      <SelectValue placeholder="请选择分类" />
    </SelectTrigger>
    <SelectContent>
      {props.data.map((item) => {
        return (
          <SelectItem
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        );
      })}
    </SelectContent>
  </UISelect>
);
