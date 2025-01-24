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
        className="w-full pl-12 pr-4 py-3 border border-black rounded-lg bg-transparent placeholder:text-gray-400 focus:ring-0 focus:border-gray-600 transition-colors text-lg h-14"
        placeholder="Search guides..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};