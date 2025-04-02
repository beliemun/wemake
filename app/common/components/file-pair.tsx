import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface FilePairProps {
  name: string;
  label: string;
  description: string;
}

export default function FilePair({ name, label, description }: FilePairProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="flex flex-col gap-2 p-6 text-muted-foreground">
      <Label htmlFor={name} className="flex flex-col items-start text-foreground">
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Input id={name} name={name} type="file" className="w-1/2" required onChange={handleChange} />
      <div className="text-xs text-muted-foreground flex flex-col gap-1">
        <span>Recommended size: 128x128</span>
        <span>Allowed formats: PNG, JPG, GIF</span>
        <span>Max size: 1MB</span>
      </div>
      {preview && <img src={preview} alt="Preview" className="w-1/2 object-cover shadow-lg" />}
    </div>
  );
}
