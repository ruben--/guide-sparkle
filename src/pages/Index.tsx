import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { GuideCard } from "@/components/GuideCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";

// Static data to replace API calls
const staticGuides = [
  {
    id: "1",
    title: "Installation av Espen",
    description: "En grundläggande guide för installation av Espen-systemet."
  },
  {
    id: "2",
    title: "Växelriktare Konfiguration",
    description: "Steg-för-steg instruktioner för att konfigurera olika typer av växelriktare."
  },
  {
    id: "3",
    title: "Felsökning",
    description: "Vanliga problem och lösningar vid installation av Espen."
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthState();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = staticGuides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-6xl py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-medium tracking-tight text-black text-center">Så installerar du Espen</h1>
        <p className="text-gray-500 text-center max-w-2xl mx-auto">
          Nedan finner du anvisningar för att installera Espen samt anvisningar för olika växelriktare.
        </p>
      </div>
      <SearchBar onSearch={setSearchQuery} />
      {filteredGuides.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Inga guider hittades som matchar din sökning.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <GuideCard 
              key={guide.id}
              id={guide.id}
              title={guide.title}
              description={guide.description}
            />
          ))}
        </div>
      )}
      {isLoggedIn && (
        <Button
          onClick={() => navigate("/admin")}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 bg-black hover:bg-gray-800 transition-colors shadow-lg"
          size="icon"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;