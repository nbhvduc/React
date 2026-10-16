import { useState, useEffect } from "react";
import {
  getSalaryDatailAPI,
  type SalaryInfo,
} from "../Pages/SalaryDetail/SalaryDetailAPI";

export function useGetSalaryEmployee(year: number, month: number) {
  const [salaryResult, setSalaryResult] = useState<{
    year: number;
    month: number;
    data: SalaryInfo;
  } | null>(null);

  useEffect(() => {
    let isCurrentRequest = true;
    setSalaryResult(null);

    getSalaryDatailAPI(year, month)
      .then((data) => {
        if (isCurrentRequest) {
          setSalaryResult({ year, month, data });
        }
      })
      .catch((error: unknown) => {
        if (isCurrentRequest) {
          console.error("Failed to fetch salary information", error);
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [year, month]);

  const SalaryInfo =
    salaryResult?.year === year && salaryResult.month === month
      ? salaryResult.data
      : null;

  return { SalaryInfo };
}
