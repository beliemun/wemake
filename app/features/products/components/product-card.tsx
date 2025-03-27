import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { MessageCircle, EyeIcon, ChevronUp } from "lucide-react";
import { cn } from "~/lib/utils";

interface ProductCardProps {
  link: string;
  productName: string;
  productDescription: string;
  commentsCount: number;
  viewsCount: number;
  votesCount: number;
}

export function ProductCard({
  link,
  productName,
  productDescription,
  commentsCount,
  viewsCount,
  votesCount,
}: ProductCardProps) {
  return (
    <Link to={link}>
      <Card
        className={cn(
          "flex flex-row justify-between items-start rounded-lg hover:bg-accent transition-colors",
          "border border-foreground/10"
        )}
      >
        <CardHeader className="flex-1">
          <CardTitle>{productName}</CardTitle>
          <CardDescription>{productDescription}</CardDescription>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{commentsCount}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <EyeIcon className="w-4 h-4" />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center cursor-default h-14"
          >
            <ChevronUp className="w-4 h-4 text-foreground" />
            <span className="text-sm text-foreground">{votesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
