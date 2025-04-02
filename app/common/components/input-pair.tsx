import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
interface InputPairProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  description: string;
  textArea?: boolean;
}

export default function InputPair({
  id,
  label,
  description,
  textArea = false,
  ...rest
}: InputPairProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={id} className="flex flex-col items-start">
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textArea ? <Textarea {...rest} /> : <Input {...rest} />}
    </div>
  );
}
