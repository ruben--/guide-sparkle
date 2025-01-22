import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { GuideCard } from "@/components/GuideCard";
import { Link } from "react-router-dom";

const guides = [
  {
    id: "1",
    title: "Getting Started",
    description: "Learn the basics of our platform",
  },
  {
    id: "2",
    title: "Advanced Features",
    description: "Dive deep into advanced functionality",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Guides Portal</h1>
          <Link to="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} {...guide} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;