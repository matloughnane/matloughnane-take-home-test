import { RouterProvider } from "react-router";
import { AuthProvider } from "./lib/contexts/auth-context";
import { router } from "./lib/router";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
