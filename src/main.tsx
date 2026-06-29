
import { createRoot } from "react-dom/client";
import Routes from "./app/routes/Routes";
import { ShoppingProvider } from "./app/context/ShoppingContext";
import { AuthProvider } from "./app/context/AuthContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ShoppingProvider>
      <Routes />
    </ShoppingProvider>
  </AuthProvider>
);
  