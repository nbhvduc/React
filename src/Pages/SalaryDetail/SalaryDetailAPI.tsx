export async function getSalaryDatailAPI(year: number, month: number) {
  const token = localStorage.getItem("jwt");

  const res = await fetch(
    `http://127.0.0.1:8000/get_salary/get_salary_me/${year}/${month}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch employee information");
  }
  return data;
}
