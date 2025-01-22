import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      // First, check if there's an existing session and sign out if there is
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        console.error("Error signing out:", signOutError);
      }

      console.log("Attempting login with admin credentials...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "admin123",
      });

      console.log("Login response:", { data, error });

      if (error) {
        console.error("Login error details:", error);
        let errorMessage = "Failed to authenticate. Please try again.";
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please check your credentials.";
        }
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (data.user && data.session) {
        console.log("Login successful, user:", data.user.id);
        onLoginSuccess();
        toast({
          title: "Success",
          description: "Successfully logged in as admin",
        });
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
      <div className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <Input
          type="password"
          placeholder="Enter admin code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
        />
        <Button 
          className="w-full" 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
};