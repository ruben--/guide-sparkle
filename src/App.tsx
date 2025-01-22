import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, createBrowserRouter, RouterProvider, useRouteError, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Admin from "@/pages/Admin";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { GuideErrorState } from "@/components/GuideErrorState";
import Index from "./pages/Index";
import { Guide } from "./pages/Guide";
import { useAuthState } from "./hooks/useAuthState";

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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthState();
  
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
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
        element: <Index />,
      },
      {
        path: "/guide/:id",
        element: <Guide />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth",
        element: <AdminLogin onLoginSuccess={() => null} />,
      },
    ],
  },
]);

const App = () => (
  <TooltipProvider>
    <RouterProvider router={router} />
    <Toaster />
    <Sonner />
  </TooltipProvider>
);

export default App;