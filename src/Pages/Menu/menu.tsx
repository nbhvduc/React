import { useState } from "react";
import { useNavigate } from "react-router";

import menuSticker from "../../assets/menu-sticker.png";
import "./menu.css";

export function Menu() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev)
  }

  const menuClassName = ["menu", isMenuOpen ? 'menu-open' : ""].join(" ")
  // isMenuOpen = true => ["menu", "menu-open "]
  // isMenuOpen = false => ["menu"]
  // ["menu", isMenuOpen ? 'menu-open' : ""].join(" ")  => 'menu menu-open'
  console.log(menuClassName)

  return (
    <div className="container">
      <div className={menuClassName}>
        <ul>
          <li onClick={() => {
            navigate('/')
            handleToggleMenu()
          }}>
            Home page
          </li>
          <li onClick={() => {
            navigate('/salary')
            handleToggleMenu()
          }}>
            Salary
          </li>
          <li onClick={() => {
            navigate('/change-password')
            handleToggleMenu()
          }}>
            Change Password
          </li>
        </ul>
        <span onClick={handleToggleMenu} className="close-menu-icon">X</span>
      </div>
      <div className="app-content">
        <div className="header">
          <img onClick={handleToggleMenu} src={menuSticker} alt="menu-icon" />
          <h3 className="title-menu">勤怠管理アプリ</h3>
        </div>
      </div>
    </div>
  );
}
