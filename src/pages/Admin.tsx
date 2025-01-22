import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const [code, setCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: guides, isLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching guides:', error);
        throw error;
      }
      return data;
    },
    enabled: isAuthenticated,
  });

  const handleLogin = async () => {
    if (code === "0129") {
      try {
        // Sign in with a dummy email/password for admin
        const { error } = await supabase.auth.signInWithPassword({
          email: 'admin@example.com',
          password: 'admin123',
        });

        if (error) throw error;

        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "Successfully logged in as admin",
        });
      } catch (error) {
        console.error('Login error:', error);
        toast({
          title: "Error",
          description: "Failed to authenticate with Supabase",
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

  const handleAddDoc = async () => {
    try {
      // Basic URL validation
      if (!docUrl.startsWith('https://')) {
        toast({
          title: "Error",
          description: "Please enter a valid URL starting with https://",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('guides')
        .insert([
          { 
            title: "New Guide", // Default title
            doc_url: docUrl,
          }
        ]);

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      // Clear the input and show success message
      setDocUrl("");
      toast({
        title: "Success",
        description: "Guide added successfully",
      });

      // Refresh the guides list
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    } catch (error) {
      console.error('Error adding document:', error);
      toast({
        title: "Error",
        description: "Failed to add document",
        variant: "destructive",
      });
    }
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
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Add New Guide</h2>
            <Input
              placeholder="Enter Google Doc URL"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
            />
            <Button onClick={handleAddDoc}>Add Document</Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Existing Guides</h2>
            {isLoading ? (
              <p>Loading guides...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Document URL</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guides?.map((guide) => (
                    <TableRow key={guide.id}>
                      <TableCell>{guide.title}</TableCell>
                      <TableCell>{guide.description}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {guide.doc_url}
                      </TableCell>
                      <TableCell>
                        {new Date(guide.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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