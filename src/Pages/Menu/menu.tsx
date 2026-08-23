import { useState } from "react";
import menuSticker from "../../assets/menu-sticker.png";
import "./menu.css";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function hanldeToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  const classMenu = ["menu", isMenuOpen ? "menu-open" : ""].join(" ");
  console.log(classMenu);

  return (
    <div className="container">
      <div className={classMenu}>
        <ul>
          <li onClick={hanldeToggleMenu}>WEB給与明細</li>
          <li onClick={hanldeToggleMenu}>パスワード・メールアドレス設定</li>
        </ul>
      </div>

      <div className="header">
        <img onClick={hanldeToggleMenu} src={menuSticker} alt="menu-Sticker" />
        <h3 className="title-menu">勤怠管理アプリ</h3>
      </div>
    </div>
  );
}
