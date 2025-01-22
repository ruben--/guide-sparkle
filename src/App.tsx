import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Admin from "@/pages/Admin";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { GuideErrorState } from "@/components/GuideErrorState";

const queryClient = new QueryClient();

const ErrorBoundary = () => {
  const error = useRouteError() as any;
  return (
    <div className="container mx-auto p-4">
      <GuideErrorState 
        message={error?.message || "Something went wrong. Please try again later."} 
      />
    </div>
  );
};

const Layout = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <div>Index Component</div>,
      },
      {
        path: "/guide/:id",
        element: <div>Guide Component</div>,
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