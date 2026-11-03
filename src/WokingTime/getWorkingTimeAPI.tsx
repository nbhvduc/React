export async function workingTimeMonthAPI(year: number, month: number) {
  const token = localStorage.getItem("jwt");

  const res = await fetch(
    `http://127.0.0.1:8000/count_work_times?year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return data;
}
