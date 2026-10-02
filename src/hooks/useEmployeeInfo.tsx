import { useEffect, useState } from "react";

import { BacsicInfoAPI } from "../Pages/BacsicInfor/BacsicInfoAPI";

interface Employee {
  name: string;
  role_label: string;
  email: string;
  employee_code: string;
  birthday: string;
  phone: string;
  salary_type_label: number;
  base_salary: number;
  allowance: number;
  night_pay: number;
  holiday_pay: number;
  overtime_pay: number;
}

export function useEmployeeInfo() {
  const [employee, setEmployee] = useState<Employee | null>(null);

  async function getEmployee() {
    try {
      const data = await BacsicInfoAPI();
      setEmployee(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEmployee();
  }, []);

  return {
    employee,
    getEmployee,
  };
}
