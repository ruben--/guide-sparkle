import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface GuideCardProps {
  title: string;
  description: string;
  id: string;
}

export const GuideCard = ({ title, description, id }: GuideCardProps) => {
  return (
    <Link to={`/guide/${id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};