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
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-[1px] border-black rounded-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-black text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#8E9196] line-clamp-3 text-center">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};