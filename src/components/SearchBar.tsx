import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        className="w-full pl-12 py-6 text-lg bg-white border border-gray-200 focus:border-gray-300 focus:ring-gray-300 rounded-lg shadow-sm placeholder:text-gray-400"
        placeholder="Sök guider..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};