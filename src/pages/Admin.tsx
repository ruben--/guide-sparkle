import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [code, setCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    if (code === "0129") {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Successfully logged in as admin",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid admin code",
        variant: "destructive",
      });
    }
  };

  const handleAddDoc = () => {
    // Here we would integrate with Google Docs API
    toast({
      title: "Success",
      description: "Document added successfully",
    });
    setDocUrl("");
  };

  if (!isAuthenticated) {
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
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Guides
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="max-w-xl space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Add New Guide</h2>
            <Input
              placeholder="Enter Google Doc URL"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
            />
            <Button onClick={handleAddDoc}>Add Document</Button>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Guides
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;