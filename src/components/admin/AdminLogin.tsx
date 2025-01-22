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
  const { toast } = useToast();

  const handleLogin = async () => {
    if (code === "0129") {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@example.com',
          password: 'admin123',
        });

        if (error) {
          console.error('Login error:', error);
          throw error;
        }

        onLoginSuccess();
        toast({
          title: "Success",
          description: "Successfully logged in as admin",
        });
      } catch (error) {
        console.error('Login error:', error);
        toast({
          title: "Error",
          description: "Failed to authenticate. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid admin code",
        variant: "destructive",
      });
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
        />
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};