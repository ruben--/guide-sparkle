import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";

type GuideContentProps = {
  guide: Database['public']['Tables']['guides']['Row'];
};

export const GuideContent = ({ guide }: GuideContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{guide.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {guide.description && (
          <p className="text-muted-foreground mb-4">{guide.description}</p>
        )}
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: guide.content || '' }}
        />
      </CardContent>
    </Card>
  );
};