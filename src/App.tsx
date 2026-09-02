import { Outlet } from "react-router";
import { Menu } from "./Pages/Menu/menu";
import { useUser } from "./context/userProvider";

export default function App() {
  const { user } = useUser();

  return (
    <>
      {user?.role === "admin" ? <div>admin menu</div> : <Menu />}
      <Outlet />
    </>
  );
}
