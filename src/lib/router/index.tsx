import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "@/pages/login";
import Dashboard from "@/pages/hierarchy";
import ProtectedRoute from "@/components/routes/protected-route";
import ExactLoginPage from "@/pages/exact/login";
import ExactDashboardPage from "@/pages/exact/hierarchy";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/hierarchy",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/exact/",
    children: [
      {
        path: "/exact/login",
        element: <ExactLoginPage />,
      },
      {
        path: "/exact/hierarchy",
        element: (
          <ProtectedRoute>
            <ExactDashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
]);
