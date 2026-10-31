import { useCallback, useEffect, useRef, useState } from "react";
import { getTotalTimeMonthAPI } from "../WorkTimeMonth/getTotalTimeMonth";

export function useGetTotalWorking(year: number, month: number) {
  const [totalWorking, setTotalWorking] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestId = useRef(0);

  const getTotalWorking = useCallback(async () => {
    const currentRequestId = ++requestId.current;
    setLoading(true);
    setError(null);
    setTotalWorking(null);

    try {
      const data = await getTotalTimeMonthAPI(year, month);
      if (currentRequestId === requestId.current) {
        setTotalWorking(data.employee_working);
      }
    } catch (cause) {
      if (currentRequestId === requestId.current) {
        setError(
          cause instanceof Error
            ? cause
            : new Error("Failed to fetch total working time"),
        );
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  }, [year, month]);

  useEffect(() => {
    void getTotalWorking();

    return () => {
      requestId.current += 1;
    };
  }, [getTotalWorking]);

  return {
    totalWorking,
    loading,
    error,
    getTotalWorking,
  };
}
