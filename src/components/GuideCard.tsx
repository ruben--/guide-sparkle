import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface GuideCardProps {
  title: string;
  description: string;
  id: string;
}

export const GuideCard = ({ title, description, id }: GuideCardProps) => {
  return (
    <Link to={`/guide/${id}`} className="w-full">
      <Card className="w-full h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-[1px] border-custom-gray-lighter bg-white rounded-xl group">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-custom-gray-darkest group-hover:text-custom-red transition-colors duration-200 font-medium px-6 py-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-custom-gray-dark line-clamp-3 px-6 py-4">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};