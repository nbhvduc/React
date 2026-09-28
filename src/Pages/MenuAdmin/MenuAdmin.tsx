import { useNavigate } from "react-router";

import "./MenuAdmin.module.css";

export function MenuAdmin() {
  const navigate = useNavigate();

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
            onClick={() => {
              navigate("/login");
            }}
          >
            ログアウト
          </li>
        </ul>
      </nav>
    </>
  );
}
