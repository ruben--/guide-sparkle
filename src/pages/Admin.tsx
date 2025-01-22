import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { GuidesList } from "@/components/admin/GuidesList";
import { AddGuideForm } from "@/components/admin/AddGuideForm";
import { useIsMobile } from "@/hooks/use-mobile";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className={`container ${isMobile ? 'px-4' : 'py-8'}`}>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Admin Dashboard</h1>
        <div className="space-y-4 md:space-y-8">
          <AddGuideForm />
          <GuidesList />
          <Button variant="outline" onClick={() => navigate("/")} className="w-full md:w-auto">
            Back to Guides
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;