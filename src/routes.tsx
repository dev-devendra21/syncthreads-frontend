import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/main/Dashboard";
import { MapView } from "./pages/main/MapView";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "map/:id",
        element: (
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Auth />
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <Auth />
      </AuthRoute>
    ),
  },
  {
    path: "*",
    element: (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl">404 Page Not Found</h1>
      </div>
    ),
  },
]);

export default router;
