import { useState } from "react";
import menuSticker from "../../assets/menu-sticker.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useUser } from "../../context/userProvider";

import "./MenuAdmin.css";

export function MenuAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? "";
  const { user } = useUser();
  console.log(email);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  const classMenu = ["menu", isMenuOpen ? "menu-open" : ""].join(" ");
  console.log(classMenu);

  return (
    <div className="container">
      <header>{user?.name}</header>
      <div className={classMenu}>
        <ul>
          <li
            onClick={() => {
              navigate("/home");
              handleToggleMenu();
            }}
          >
            ホームページ
          </li>
          <li
            onClick={() => {
              navigate("/SalaryList", { state: { email: email } });
              handleToggleMenu();
            }}
          >
            WEB給与明細
          </li>
          <li
            onClick={() => {
              navigate("/changepassword", { state: { email } });
              handleToggleMenu();
            }}
          >
            パスワード・メールアドレス設定
          </li>
          <li
            onClick={() => {
              navigate("/create_employee");
              handleToggleMenu();
            }}
          >
            Create Employee
          </li>

          <li
            onClick={() => {
              navigate("/login");
              handleToggleMenu();
            }}
          >
            ログアウト
          </li>
        </ul>
      </div>

      <div className="header">
        <img
          style={{ cursor: "pointer" }}
          onClick={handleToggleMenu}
          src={menuSticker}
          alt="menu-Sticker"
        />
        <h3 className="title-menu">勤怠管理システム</h3>
      </div>
    </div>
  );
}
