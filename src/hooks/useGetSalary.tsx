import { useState, useEffect } from "react";
import { getSalaryDatailAPI } from "../Pages/SalaryDetail/SalaryDetailAPI";

interface SalaryInfo {
  name: string;
  role_label: string;
  email: string;
  employee_code: string;
  salary_type_label: number;
  total_salary: number;
  base_salary: number;
  allowance: number;
  night_pay: number;
  holiday_pay: number;
  overtime_pay: number;
}
export function useGetSalaryEmployee(year: number, month: number) {
  const [SalaryInfo, setSalaryInfo] = useState<SalaryInfo | null>(null);
  async function getSalary(year: number, month: number) {
    try {
      const data = await getSalaryDatailAPI(year, month);
      setSalaryInfo(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSalary(year, month);
  }, [year, month]);
  return {
    SalaryInfo,
    getSalary,
  };
}
