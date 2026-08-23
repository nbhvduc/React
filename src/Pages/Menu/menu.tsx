import "./menu.css";
import menuSticker from "../../assets/menu-sticker.png";

export function Menu() {
  return (
    <div>
      <div className="header">
        <img src={menuSticker} alt="menu-Sticker" />
        <h3 className="title-menu">勤怠管理アプリ</h3>
      </div>
    </div>
  );
}
