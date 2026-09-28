import "./SalaryList.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SalaryList() {
  const [selectYear, setSelectYear] = useState("2026");
  const [isSelectYear, setIsSelectYear] = useState(false);
  const navigate = useNavigate();

  const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

  function handleSalaryDetail(month: string) {
    navigate(`/SalaryDetail/${selectYear}/${month}`);
  }

  function handleSelectYear(e: any) {
    setSelectYear(e.target.value);
  }

  function handleToggleSelectYear() {
    setIsSelectYear((prev) => !prev);
  }

  const classSelectYear = ["select-year", isSelectYear ? "open" : ""].join(" ");
  console.log(classSelectYear);

  return (
    <div>
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
              <span onClick={() => handleSalaryDetail("1")}>1月</span>
              <span onClick={() => handleSalaryDetail("2")}>2月</span>
              <span onClick={() => handleSalaryDetail("3")}>3月</span>
            </div>
            <div>
              <span onClick={() => handleSalaryDetail("4")}>4月</span>
              <span onClick={() => handleSalaryDetail("5")}>5月</span>
              <span onClick={() => handleSalaryDetail("6")}>6月</span>
            </div>
            <div>
              <span onClick={() => handleSalaryDetail("7")}>7月</span>
              <span onClick={() => handleSalaryDetail("8")}>8月</span>
              <span onClick={() => handleSalaryDetail("9")}>9月</span>
            </div>
            <div>
              <span onClick={() => handleSalaryDetail("10")}>10月</span>
              <span onClick={() => handleSalaryDetail("11")}>11月</span>
              <span onClick={() => handleSalaryDetail("12")}>12月</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
