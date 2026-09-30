import { useEffect, useState } from "react";
import { BacsicInfoAPI } from "./BacsicInfoAPI";
import { FaUser } from "react-icons/fa";
import "./BacsicInfo.css";

interface Employee {
  name: string;
  role: string;
  email: string;
}

export function BacsicInfo() {
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function getEmployee() {
      try {
        const data = await BacsicInfoAPI();
        setEmployee(data);
      } catch (error) {
        console.log(error);
      }
    }
    getEmployee();
  }, []);

  return (
    <div className="info-table">
      <div>
        <h3 className="employee-name">
          <FaUser className="icon-employee" />
          個人情報
        </h3>
        <p className="p">あなたの個人情報を確認できます。</p>
      </div>

      <div className="info-grid-container">
        <div className="info-name-row">
          <p className="info-grid-container-name">{employee?.name}</p>
          <span className="info-grid-container-span">{employee?.role}</span>
        </div>
        <p className="info-grid-container-email">{employee?.email}</p>
      </div>
    </div>
  );
}
