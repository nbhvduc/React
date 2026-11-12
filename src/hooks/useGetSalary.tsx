import { useCallback, useEffect, useRef, useState } from "react";
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
  const requestIdRef = useRef(0);

  const fetchSalary = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    try {
      const data = await getSalaryDatailAPI(year, month);
      if (requestId === requestIdRef.current) {
        setSalaryResult({ year, month, data });
      }
    } catch (error: unknown) {
      if (requestId === requestIdRef.current) {
        console.error("Failed to fetch salary information", error);
      }
    }
  }, [year, month]);

  useEffect(() => {
    setSalaryResult(null);
    void fetchSalary();

    return () => {
      requestIdRef.current += 1;
    };
  }, [fetchSalary]);

  const SalaryInfo =
    salaryResult?.year === year && salaryResult.month === month
      ? salaryResult.data
      : null;

  return { SalaryInfo };
}
