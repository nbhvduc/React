import { getCheckInOutDay } from "../WorkTimeMonth/getCheckIN_OUT_API";
import { useEffect, useState } from "react";

interface WorkTime {
  work_date: string;
  check_in: number | null;
  check_out: number | null;
  worked_minutes: number | null;
}

export function useGetCheckInOutDay() {
  const [data, setData] = useState<WorkTime | null>(null);

  async function WorkTimeMonth() {
    try {
      const data = await getCheckInOutDay();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    WorkTimeMonth();
  }, []);

  return {
    data,
    WorkTimeMonth,
  };
}
