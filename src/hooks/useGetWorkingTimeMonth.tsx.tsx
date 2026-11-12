import { workingTimeMonthAPI } from "../WokingTime/getWorkingTimeAPI";
import { useCallback, useEffect, useRef, useState } from "react";

interface WorkingTimeMonth {
  total_work_times: number;
  total_over_time: number;
}

export function useGetWorkingTimeMonth(year: number, month: number) {
  const [totalTime, setTotalTime] = useState<WorkingTimeMonth | null>(null);
  const requestIdRef = useRef(0);

  const fetchTotalWorkingTime = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    try {
      const data = await workingTimeMonthAPI(year, month);
      if (requestId === requestIdRef.current) {
        setTotalTime(data);
      }
    } catch (error) {
      if (requestId === requestIdRef.current) {
        console.log(error);
      }
    }
  }, [year, month]);

  useEffect(() => {
    void fetchTotalWorkingTime();

    return () => {
      requestIdRef.current += 1;
    };
  }, [fetchTotalWorkingTime]);

  return {
    totalTime,
  };
}
