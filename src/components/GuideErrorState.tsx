import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GuideErrorStateProps = {
  message?: string;
};

export const GuideErrorState = ({ message = "Det gick inte att ladda guiden. Försök igen senare." }: GuideErrorStateProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">Fel</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
};