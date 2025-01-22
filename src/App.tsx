import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Admin from "@/pages/Admin";
import { AdminLogin } from "@/components/admin/AdminLogin";

const queryClient = new QueryClient();

const Layout = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>Index Component</div>, // Replace with actual Index component
      },
      {
        path: "/guide/:id",
        element: <div>Guide Component</div>, // Replace with actual Guide component
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/auth",
        element: <AdminLogin onLoginSuccess={() => window.location.href = "/admin"} />,
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
