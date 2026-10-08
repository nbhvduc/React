import { useNavigate } from "react-router";
import { useUser } from "../../context/userProvider";

import "./MenuAdmin.module.css";

export function MenuAdmin() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  function handleLogout() {
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      <div className="header app-header">
        <h3 className="title-menu">勤怠管理システム</h3>
      </div>

      <nav className="content-project app-sidebar">
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            ホームページ
          </li>
          <li
            onClick={() => {
              navigate("/SalaryList");
            }}
          >
            WEB給与明細
          </li>
          <li
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            パスワード・メールアドレス設定
          </li>
          <li
            onClick={() => {
              navigate("/create_employee");
            }}
          >
            Create Employee
          </li>

          <li
            onClick={handleLogout}
          >
            ログアウト
          </li>
        </ul>
      </nav>
    </>
  );
}
