import { useNavigate } from "react-router";
import { useUser } from "../../context/userProvider";
import {
  FaHome,
  FaRegClock,
  FaRegFileAlt,
  FaCogs,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import "./menu.css";

export function Menu() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <>
      <div className="header app-header">
        <div className="title-menu">
          <h3>
            <FaRegClock className="title-icon" />
            勤怠管理システム
          </h3>
        </div>
        <div className="user-title">
          <div>名前：{user?.name}</div>
          <div>社員コード：{user?.employee_code}</div>
        </div>
      </div>

      <nav className="content-project">
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            <FaHome className="icons" />
            ホームページ
          </li>
          <li
            onClick={() => {
              navigate("/SalaryList");
            }}
          >
            <FaRegFileAlt className="icons" />
            WEB給与明細
          </li>
          <li
            onClick={() => {
              navigate("BacsicInfo");
            }}
          >
            <FaUser className="icons" />
            個人情報
          </li>
          <li
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            <FaCogs className="icons" />
            パスワード設定
          </li>
          <li
            onClick={() => {
              navigate("/login");
            }}
          >
            <FaSignOutAlt className="icons" />
            ログアウト
          </li>
        </ul>
      </nav>
    </>
  );
}
