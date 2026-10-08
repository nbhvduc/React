import { Navigate, Outlet } from "react-router";
import { Menu } from "./Pages/Menu/menu";
import { useUser } from "./context/userProvider";
import { MenuAdmin } from "./Pages/MenuAdmin/MenuAdmin";
import "./App.css";

export default function App() {
  const { user } = useUser();

  if (!user && !localStorage.getItem("jwt")) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      {user?.role === "admin" ? <MenuAdmin /> : <Menu />}
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
