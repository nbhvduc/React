import { getWorkTimeMonth } from "../WorkTimeMonth/getWorkTimeAPI";
import { useEffect, useState } from "react";

interface WorkTime {
  work_date: string;
  check_in: string | null;
  check_out: string | null;
}

export function useGetWorkTimeMonth() {
  const [data, setData] = useState<WorkTime | null>(null);

  async function WorkTimeMonth() {
    try {
      const data = await getWorkTimeMonth();
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
