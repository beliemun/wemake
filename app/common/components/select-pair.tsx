import { useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
interface SelectPairProps {
  name: string;
  label: string;
  description: string;
  required?: boolean;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
}

export default function SelectPair({
  name,
  label,
  description,
  required = false,
  placeholder = "",
  options,
  defaultValue,
}: SelectPairProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-2 text-foreground">
      <Label htmlFor={name} className="flex flex-col items-start" onClick={() => setOpen(true)}>
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select
        name={name}
        required={required}
        open={open}
        onOpenChange={setOpen}
        defaultValue={defaultValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
