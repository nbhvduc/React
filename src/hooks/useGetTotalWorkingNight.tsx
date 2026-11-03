import { useEffect, useState } from "react";
import { totalWorkingNightAPI } from "../totalWorkingNight/totalWorkingNightAPI";

interface WorkingNight {
  total_work_night: number;
}

export function useTotalWorkingNight(year: number, month: number) {
  const [workingNight, setWorkingNight] = useState<WorkingNight | null>(null);

  useEffect(() => {
    async function fetchTotalWorkingNight() {
      try {
        const data = await totalWorkingNightAPI(year, month);
        setWorkingNight(data);
      } catch (error) {
        console.log(error);
      }
    }
    void fetchTotalWorkingNight();
  }, [year, month]);

  return {
    workingNight,
  };
}
