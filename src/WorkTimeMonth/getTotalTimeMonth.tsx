export interface TotalWorking {
  employee_working: string;
}

function isTotalWorking(value: unknown): value is TotalWorking {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return (
    Object.hasOwn(value, "employee_working") &&
    typeof (value as Record<string, unknown>).employee_working === "string"
  );
}

export async function getTotalTimeMonthAPI(
  year: number,
  month: number,
): Promise<TotalWorking> {
  const token = localStorage.getItem("jwt");

  const res = await fetch(`http://127.0.0.1:8000/work_days/${year}/${month}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const responseBody = await res.text();
    throw new Error(
      `Failed to fetch total working time (${res.status} ${res.statusText})${responseBody ? `: ${responseBody}` : ""}`,
    );
  }

  const data: unknown = await res.json();
  if (!isTotalWorking(data)) {
    throw new Error("Invalid total working time returned by the server");
  }

  return data;
}
