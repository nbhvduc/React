import { useState, useEffect } from "react";
import { getAttendanceChart } from "../AttendanceChart/AttendanceChartAPI";
import type { AttendanceChartItem } from "../AttendanceChart/AttendanceChartAPI";

export function useAttendanceYearChart(year: number) {
  const [dataChart, setDataChart] = useState<AttendanceChartItem[]>([]);
  useEffect(() => {
    async function fetchYearChart() {
      try {
        const result = await getAttendanceChart(year);
        setDataChart(result.items);
      } catch (error) {
        console.log(error);
      }
    }
    void fetchYearChart();
  }, [year]);
  return { dataChart };
}
