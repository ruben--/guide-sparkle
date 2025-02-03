import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface GuideCardProps {
  title: string;
  description: string;
  id: string;
}

export const GuideCard = ({ title, description, id }: GuideCardProps) => {
  return (
    <Link to={`/guide/${id}`} className="block w-full h-full">
      <Card className="w-full h-full bg-white hover:bg-gray-50 transition-all duration-200 border border-gray-200 rounded-lg overflow-hidden group">
        <div className="p-8 h-full flex flex-col">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-medium text-gray-900 group-hover:text-custom-red transition-colors">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-grow">
            <p className="text-gray-600 text-base leading-relaxed">
              {description}
            </p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};