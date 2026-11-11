export interface AttendanceChartItem {
  month: string;
  total_hour: number;
}

interface AttendanceChartResponse {
  year: number;
  items: AttendanceChartItem[];
}

export async function getAttendanceChart(
  year: number,
): Promise<AttendanceChartResponse> {
  const token = localStorage.getItem("jwt");

  const res = await fetch(
    `http://127.0.0.1:8000/monthly_hours_item/?year=${year}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}
