import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "@radix-ui/react-label";
import { cn } from "~/lib/utils";
import type { DateRange } from "react-day-picker";

interface CalendarPairProps {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  className?: string;
  selected?: DateRange;
  onSelect?: (date: DateRange | undefined) => void;
}

export default function CalendarPair({
  id,
  label,
  description,
  className,
  selected,
  onSelect,
}: CalendarPairProps) {
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <Label htmlFor={id} className="flex flex-col items-start">
        {label}
        {description && <small className="text-muted-foreground">{description}</small>}
      </Label>
      <Calendar
        mode={"range"}
        id={id}
        selected={selected}
        onSelect={onSelect}
        disabled={{ before: new Date() }}
        min={5}
      />
    </div>
  );
}
