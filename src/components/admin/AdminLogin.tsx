import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (code !== "0129") {
      toast({
        title: "Error",
        description: "Invalid admin code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // First, ensure we're starting with a clean session
      await supabase.auth.signOut();

      // Add a small delay to ensure the signout is complete
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log("Attempting login with admin credentials...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "admin123",
      });

      console.log("Login response:", { data, error });

      if (error) {
        console.error("Login error details:", error);
        toast({
          title: "Error",
          description: "Invalid credentials. Please ensure the admin user exists in Supabase.",
          variant: "destructive",
        });
        return;
      }

      if (data.user && data.session) {
        console.log("Login successful, user:", data.user.id);
        toast({
          title: "Success",
          description: "Successfully logged in as admin",
        });
        onLoginSuccess();
        // Redirect to the home page instead of the admin page
        navigate("/");
      } else {
        throw new Error("No user data received");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-6 border border-black">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <Input
          type="password"
          placeholder="Enter admin code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
          className="rounded-none border-black"
        />
        <Button 
          className="w-full rounded-none border-black" 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
};