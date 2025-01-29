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
      <Card className="w-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-[1px] border-custom-gray-darkest bg-custom-gray-lightest rounded-lg group">
        <CardHeader className="pb-2 bg-gradient-to-r from-custom-orange-light to-custom-orange group-hover:from-custom-red group-hover:to-custom-red-dark transition-all duration-200 rounded-t-lg">
          <CardTitle className="text-xl text-custom-gray-lightest text-center font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-custom-gray-dark line-clamp-3 text-center">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};