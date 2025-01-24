import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface GuideCardProps {
  title: string;
  description: string;
  id: string;
}

export const GuideCard = ({ title, description, id }: GuideCardProps) => {
  return (
    <Link to={`/guide/${id}`} className="block group">
      <Card className="h-full border border-black rounded-lg hover:bg-gray-50 transition-all duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium tracking-tight text-black group-hover:translate-x-1 transition-transform">
            {title}
            <ArrowRight className="inline-block ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 line-clamp-3 mb-4">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};