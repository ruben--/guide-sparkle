import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
    navigate("/");
  };

  return (
    <nav className="border-b mb-8 py-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="text-lg font-semibold hover:text-primary">
            Guides
          </Link>
          <Link to="/admin" className="text-lg hover:text-primary">
            Admin
          </Link>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};