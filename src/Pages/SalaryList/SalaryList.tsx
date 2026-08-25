import { useLocation } from "react-router";
import "./SalaryList.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SalaryList() {
  const location = useLocation();
  const [isUserDropDown, setIsUserDropDown] = useState(false);
  const [selectYear, setSelectYear] = useState("2026");
  const [isSelectYear, setIsSelectYear] = useState(false);
  const navigate = useNavigate();
  const email = location.state?.email ?? "";

  const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  function handleDropDown() {
    setIsUserDropDown((prev) => !prev);
  }

  function handleLogout() {
    navigate("/login");
  }

  function handleSalaryDetail() {
    navigate("/SalaryDetail");
  }

  function handleSelectYear(e: any) {
    setSelectYear(e.target.value);
  }

  function handleToggleSelectYear() {
    setIsSelectYear((prev) => !prev);
  }

  const classDropDown = ["drop-down", isUserDropDown ? "open" : ""].join(" ");
  console.log(classDropDown);

  const classSelectYear = ["select-year", isSelectYear ? "open" : ""].join(" ");
  console.log(classSelectYear);

  return (
    <div>
      <div
        className={classDropDown}
        onClick={handleDropDown}
        style={{ display: "flex", gap: "10px", cursor: "pointer" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          style={{
            display: "flex",
            width: "26px",
            height: "26px",
            marginLeft: "14px",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <header className="header-salary">{email}</header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          style={{
            width: "20px",
            height: "20px",
            display: "flex",
            marginTop: "8px",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {isUserDropDown && (
        <button
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            display: "flex",
            marginLeft: "100px",
          }}
          onClick={handleLogout}
        >
          ログアウト{" "}
        </button>
      )}
      <div className="content-box-salary">
        <div className="title-salary">
          <h4>Web給与明細</h4>
          <span>ご覧になりたい対象月を選択してください。</span>
        </div>
        <div className="salary-content">
          <div className={classSelectYear} onClick={handleToggleSelectYear}>
            <select
              style={{ cursor: "pointer" }}
              value={selectYear}
              onChange={handleSelectYear}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ))}
            </select>
          </div>
          <div className="month-content-box">
            <div>
              <span>1月</span>
              <span>2月</span>
              <span>3月</span>
            </div>
            <div className="4-6">
              <span>4月</span>
              <span>5月</span>
              <span>6月</span>
            </div>
            <div>
              <span>7月</span>
              <span>8月</span>
              <span>9月</span>
            </div>
            <div>
              <span>10月</span>
              <span>11月</span>
              <span>12月</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
