import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

type GuideErrorStateProps = {
  message?: string;
};

export const GuideErrorState = ({ message = "Failed to load guides. Please try again later." }: GuideErrorStateProps) => {
  return (
    <Card className="border-2 border-black rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-medium flex items-center gap-2 text-red-600">
          <AlertCircle className="h-6 w-6" />
          Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{message}</p>
      </CardContent>
    </Card>
  );
};