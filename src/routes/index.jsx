import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import ErrorScreen from "../components/ui/errorScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/favoritos",
    element: <Home />,
    errorElement: <ErrorScreen />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
