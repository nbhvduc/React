import { useState } from "react";
import { useParams } from "react-router";
import { useGetSalaryEmployee } from "../../hooks/useGetSalary";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useEmployeeInfo } from "../../hooks/useEmployeeInfo";
import "./SalaryDetail.css";

export function SalaryDetail() {
  const { year, month } = useParams();
  const yearAsNumber = Number(year);
  const monthAsNumber = Number(month);
  const { SalaryInfo } = useGetSalaryEmployee(yearAsNumber, monthAsNumber);
  const { employee } = useEmployeeInfo();

  const [currentTime, setCurrentTime] = useState(
    new Date(yearAsNumber, monthAsNumber - 1),
  );

  const goToPreviousMonth = () => {
    setCurrentTime((prev) => {
      const newTime = new Date(prev);

      const newMonth = newTime.getMonth() - 1;

      newTime.setMonth(newMonth);

      return newTime;
    });
  };

  const goToNextMoth = () => {
    setCurrentTime((prev) => {
      const newTime = new Date(prev);

      const newMonth = newTime.getMonth() + 1;

      newTime.setMonth(newMonth);

      return newTime;
    });
  };

  const monthLabel = currentTime.toLocaleDateString("ja-JP", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="salary-detail-page">
      <nav className="salary-month-navigation">
        <button
          className="goToPreviousMonth"
          type="button"
          onClick={goToPreviousMonth}
        >
          ＜先月
        </button>
        <div className="monthLabel">{monthLabel}</div>
        <button className="goToNextMonth" type="button" onClick={goToNextMoth}>
          ＞来月
        </button>
      </nav>
      <div className="salary-overview">
        <section className="salary-profile-panel">
          <div>
            <h3 className="employee-name">
              <FaUser className="icon-employee" />
              給与明細
            </h3>
            <p className="p"> 給与の詳細を確認できます。</p>
          </div>
          <div className="salary-employee-card">
            <div className="name-role-row">
              <p className="info-grid-container-name">{employee?.name}</p>
              <span className="info-grid-container-span">
                {employee?.role_label}
              </span>
            </div>
            <div className="info-grid-container-email">
              <div className="icon-user">
                <FaEnvelope className="icon" />
                <span className="email-label">メールアドレス</span>
              </div>
              <span> {employee?.email}</span>
            </div>
            <div className="info-grid-container-role">
              <div className="icon-user">
                <FaUser className="icon" />
                <span>役割</span>
              </div>
              <span>{employee?.role_label} </span>
            </div>
          </div>
        </section>
        <section className="salary-breakdown">
          <div className="info-row">
            <div className="info-lable">給与タイプ</div>
            <div className="info-value">{SalaryInfo?.salary_type_label}</div>
          </div>

          <div className="info-row">
            <div className="info-lable">基本給</div>
            <div className="info-value">{SalaryInfo?.base_salary}</div>
          </div>
          <div className="info-row">
            <div className="info-lable">各種手当</div>
            <div className="info-value">{SalaryInfo?.allowance}</div>
          </div>
          <div className="info-row">
            <div className="info-lable">深夜手当</div>
            <div className="info-value">{SalaryInfo?.night_pay}</div>
          </div>
          <div className="info-row">
            <div className="info-lable">休日手当</div>
            <div className="info-value">{SalaryInfo?.holiday_pay}</div>
          </div>
          <div className="info-row">
            <div className="info-lable">時間外手当</div>
            <div className="info-value">{SalaryInfo?.overtime_pay}</div>
          </div>
          <div className="salary-total-row">
            <div className="info-lable">総支給額</div>
            <div className="info-value">{SalaryInfo?.total_salary}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
