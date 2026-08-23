import { Outlet } from "react-router";
import { Menu } from "./Pages/Menu/menu";

export default function App() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}