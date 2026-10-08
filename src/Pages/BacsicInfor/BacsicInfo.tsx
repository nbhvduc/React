import { useEmployeeInfo } from "../../hooks/useEmployeeInfo";
import { FaUser, FaEnvelope, FaMoneyBillWave, FaEdit } from "react-icons/fa";
import "./BacsicInfo.css";
import { useNavigate } from "react-router";

export function BacsicInfo() {
  const { employee } = useEmployeeInfo();
  const navigate = useNavigate();

  function handleNavigateChangeMyProfile() {
    navigate("/UpdateMyProfile");
  }

  return (
    <div className="info-page-wrapper">
      <div>
        <h3 className="employee-name">
          <FaUser className="icon-employee" />
          個人情報
        </h3>
        <p className="p">あなたの個人情報を確認できます。</p>
      </div>

      <div className="info-grid-container">
        <div className="info-name-row">
          <div className="info-text-group">
            <FaEdit
              onClick={handleNavigateChangeMyProfile}
              className="icon-edit"
            />

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
        </div>
      </div>

      <div className="info-container">
        <div className="info-left">
          <h3 className="employee-info">
            <FaUser className="icon-user-info" />
            個人情報
          </h3>
          <div className="info-table">
            <div className="info-row">
              <div className="info-lable">氏名</div>
              <div className="info-value">{employee?.name}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">社員コード</div>
              <div className="info-value">{employee?.employee_code}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">生年月日</div>
              <div className="info-value">{employee?.birthday}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">電話番号</div>
              <div className="info-value">{employee?.phone}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">役割</div>
              <div className="info-value">{employee?.role_label}</div>
            </div>
          </div>
        </div>

        <div className="info-right">
          <h3 className="employee-info">
            <FaMoneyBillWave className="icon-user-info" />
            給与情報
          </h3>
          <div className="info-table">
            <div className="info-row">
              <div className="info-lable">給与タイプ</div>
              <div className="info-value">{employee?.salary_type_label}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">基本給</div>
              <div className="info-value">{employee?.base_salary}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">各種手当</div>
              <div className="info-value">{employee?.allowance}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">深夜手当</div>
              <div className="info-value">{employee?.night_pay}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">休日手当</div>
              <div className="info-value">{employee?.holiday_pay}</div>
            </div>
            <div className="info-row">
              <div className="info-lable">時間外手当</div>
              <div className="info-value">{employee?.overtime_pay}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
