import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Fel",
        description: "Det gick inte att logga ut",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Klart",
      description: "Du har loggats ut",
    });
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <nav className="border-b border-custom-gray-lighter mb-8 py-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D0BAQFjhhGBkoBGkA/company-logo_200_200/company-logo_200_200/0/1731318042538/feverenergy_logo?e=2147483647&v=beta&t=wKLSwZDTsxJSA2Izt0BJQAND4V4cXRn8vKr2jOpezMY" 
              alt="Fever Energy Logotyp" 
              className="h-8 w-auto"
            />
            <Link to="/" className="text-lg font-medium text-custom-gray-darkest hover:text-custom-red">
              Guider
            </Link>
            {isLoggedIn && (
              <Link to="/admin" className="text-lg text-custom-gray-dark hover:text-custom-red">
                Admin
              </Link>
            )}
          </div>
          <Button 
            variant="outline" 
            onClick={isLoggedIn ? handleLogout : handleLogin}
            className="border-custom-gray-lighter hover:bg-custom-gray-lightest hover:border-custom-gray-light text-custom-gray-dark"
          >
            {isLoggedIn ? "Logga ut" : "Logga in"}
          </Button>
        </div>
      </div>
    </nav>
  );
};