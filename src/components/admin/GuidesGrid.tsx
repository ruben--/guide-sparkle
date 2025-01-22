import { GuideLoadingState } from "@/components/GuideLoadingState";

interface GuidesGridProps {
  count?: number;
}

export const GuidesGrid = ({ count = 3 }: GuidesGridProps) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(count)].map((_, i) => (
      <GuideLoadingState key={i} />
    ))}
  </div>
);