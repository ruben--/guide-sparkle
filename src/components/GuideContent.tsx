import { Card } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";
import { GuideEditMode } from "./guide/GuideEditMode";
import { GuideViewMode } from "./guide/GuideViewMode";
import { useAuthState } from "@/hooks/useAuthState";
import { useGuideOperations } from "@/hooks/useGuideOperations";

type GuideContentProps = {
  guide: Database['public']['Tables']['guides']['Row'];
};

export const GuideContent = ({ guide }: GuideContentProps) => {
  const isLoggedIn = useAuthState();
  const {
    isEditing,
    title,
    setTitle,
    description,
    setDescription,
    content,
    setContent,
    handleEditClick,
    handleUpdate,
    handleDelete,
    setIsEditing,
  } = useGuideOperations(guide);

  if (!guide) return null;

  return (
    <Card>
      {isEditing ? (
        <GuideEditMode
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          content={content}
          setContent={setContent}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <GuideViewMode
          title={guide.title}
          description={guide.description}
          content={guide.content}
          isLoggedIn={isLoggedIn}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      )}
    </Card>
  );
};