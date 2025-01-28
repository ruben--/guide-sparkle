import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mono-medium h-5 w-5" />
      <Input
        className="w-full pl-12 pr-4 py-3 border-2 border-mono-darker rounded-lg bg-mono-white placeholder:text-mono-medium focus:ring-0 focus:border-mono-dark transition-colors text-lg h-14"
        placeholder="Sök anvisningar"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};