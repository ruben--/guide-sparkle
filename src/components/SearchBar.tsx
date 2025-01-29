import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-custom-gray" />
      <Input
        className="pl-12 py-6 text-lg border-custom-gray-lighter focus:border-custom-gray-light focus:ring-custom-gray-light rounded-xl shadow-sm"
        placeholder="Sök guider..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};