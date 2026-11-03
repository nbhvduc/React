import { workingTimeMonthAPI } from "../WokingTime/getWorkingTimeAPI";
import { useState, useEffect } from "react";

interface WorkingTimeMonth {
  total_work_times: number;
  total_over_time: number;
}

export function useGetWorkingTimeMonth(year: number, month: number) {
  const [totalTime, setTotalTime] = useState<WorkingTimeMonth | null>(null);

  useEffect(() => {
    async function fetchTotalWorkingTime() {
      try {
        const data = await workingTimeMonthAPI(year, month);
        setTotalTime(data);
      } catch (error) {
        console.log(error);
      }
    }
    void fetchTotalWorkingTime();
  }, [year, month]);

  return {
    totalTime,
  };
}
