import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useGetSalaryEmployee } from "../../hooks/useGetSalary";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useEmployeeInfo } from "../../hooks/useEmployeeInfo";
import "./SalaryDetail.css";

export function SalaryDetail() {
  const { year, month } = useParams();
  const navigate = useNavigate();
  const selectedYear = Number(year);
  const selectedMonth = Number(month);
  const selectedDate = new Date(selectedYear, selectedMonth - 1, 1);
  const { SalaryInfo } = useGetSalaryEmployee(selectedYear, selectedMonth);
  const { employee } = useEmployeeInfo();

  const goToPreviousMonth = () => {
    const previousMonth = new Date(selectedYear, selectedMonth - 2, 1);
    navigate(
      `/SalaryDetail/${previousMonth.getFullYear()}/${previousMonth.getMonth() + 1}`,
    );
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(selectedYear, selectedMonth, 1);
    navigate(
      `/SalaryDetail/${nextMonth.getFullYear()}/${nextMonth.getMonth() + 1}`,
    );
  };

  const today = new Date();
  const isCurrentOrFutureMonth =
    selectedYear > today.getFullYear() ||
    (selectedYear === today.getFullYear() &&
      selectedMonth >= today.getMonth() + 1);

  const monthLabel = selectedDate.toLocaleDateString("ja-JP", {
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
        <button
          className="goToNextMonth"
          type="button"
          onClick={goToNextMonth}
          disabled={isCurrentOrFutureMonth}
        >
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
