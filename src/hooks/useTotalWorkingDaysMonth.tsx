import { useEffect, useState } from "react";
import { getTotalWorkingDays } from "../WorkTimeMonth/getTotalWorkingDays";

interface TotalWorking {
  total_work_day: number;
}

export function useTotalWorkingDaysMonth(year: number, month: number) {
  const [workingDays, setWorkingDays] = useState<TotalWorking | null>(null);

  useEffect(() => {
    async function fetchWorkingDays() {
      try {
        const data = await getTotalWorkingDays(year, month);
        setWorkingDays(data);
      } catch (error) {
        console.log(error);
      }
    }
    void fetchWorkingDays();
  }, [year, month]);
  return {
    workingDays,
  };
}
