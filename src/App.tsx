import { Outlet } from "react-router";
import { Menu } from "./Pages/Menu/menu";
import { useUser } from "./context/userProvider";
import { MenuAdmin } from "./Pages/MenuAdmin/MenuAdmin";

export default function App() {
  const { user } = useUser();

  return (
    <>
      {user?.role === "admin" ? <MenuAdmin /> : <Menu />}
      <Outlet />
    </>
  );
}
