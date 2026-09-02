import { useState } from "react";
import menuSticker from "../../assets/menu-sticker.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import "./menu.css";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? "";
  console.log(email);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  const classMenu = ["menu", isMenuOpen ? "menu-open" : ""].join(" ");
  console.log(classMenu);

  return (
    <div className="container">
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
        <h3 className="title-menu">勤怠管理アプリ</h3>
      </div>
    </div>
  );
}
