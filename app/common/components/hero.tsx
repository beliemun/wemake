import { cn } from "~/lib/utils";

interface HeroProps {
  title: string;
  description?: string;
  className?: string;
}

export function Hero({ title, description, className }: HeroProps) {
  return (
    <figure
      className={cn(
        "flex flex-col justify-center items-center p-20 gap-4",
        "bg-gradient-to-bl from-background to-primary/100 rounded-lg",
        className
      )}
    >
      <h1 className="text-4xl font-bold text-foreground">{title}</h1>
      {description && <p className="text-xl text-muted-foreground">{description}</p>}
    </figure>
  );
}
