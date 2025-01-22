import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GuideErrorStateProps = {
  message?: string;
};

export const GuideErrorState = ({ message = "Failed to load guide. Please try again later." }: GuideErrorStateProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">Error</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
};