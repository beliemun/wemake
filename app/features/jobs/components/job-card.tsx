import { Link } from "react-router";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";

interface JobCardProps {
  companyLogo: string;
  companyName: string;
  postedDate: string | null;
  title: string;
  salary: string;
  location: string;
  jobId: string;
  badges: string[];
}

export function JobCard({
  companyLogo,
  companyName,
  postedDate,
  title,
  salary,
  location,
  jobId,
  badges,
}: JobCardProps) {
  return (
    <Card className="bg-transparent transition-colors hover:bg-card/50">
      <CardHeader>
        <div className="flex flex-row items-center gap-2">
          <img src={companyLogo} alt={`${companyName} Logo`} className="size-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <span className="text-sm">{companyName}</span>
            <span className="text-sm text-muted-foreground">{postedDate}</span>
          </div>
        </div>
        {/* <CardTitle className="text-xl">{title}</CardTitle> */}
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Badge variant="secondary" key={badge}>
            {badge}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">{salary}</span>
          <span className="text-xs text-muted-foreground">{location}</span>
        </div>
        <Button className="cursor-pointer" variant="outline">
          <Link to={`/jobs/${jobId}`}>Apply now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
