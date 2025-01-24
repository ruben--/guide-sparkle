import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const GuideLoadingState = () => {
  return (
    <Card className="border-2 border-black rounded-none">
      <CardHeader>
        <Skeleton className="h-8 w-[80%] bg-gray-200" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-5/6 bg-gray-200" />
          <Skeleton className="h-4 w-4/6 bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
};