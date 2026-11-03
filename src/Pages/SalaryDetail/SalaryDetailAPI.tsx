export interface SalaryInfo {
  salary_type_label?: string | number | null;
  total_salary?: number | string | null;
  base_salary?: number | string | null;
  allowance?: number | string | null;
  night_pay?: number | string | null;
  holiday_pay?: number | string | null;
  overtime_pay?: number | string | null;
}

function isSalaryInfo(value: unknown): value is SalaryInfo {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const salary = value as Record<string, unknown>;
  const salaryFields = [
    "salary_type_label",
    "total_salary",
    "base_salary",
    "allowance",
    "night_pay",
    "holiday_pay",
    "overtime_pay",
  ] as const;

  const returnedSalaryFields = salaryFields.filter((field) =>
    Object.hasOwn(salary, field),
  );

  return (
    returnedSalaryFields.length > 0 &&
    returnedSalaryFields.every((field) => {
      const fieldValue = salary[field];
      return (
        fieldValue === null ||
        typeof fieldValue === "string" ||
        typeof fieldValue === "number"
      );
    })
  );
}

export async function getSalaryDatailAPI(
  year: number,
  month: number,
): Promise<SalaryInfo> {
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
  if (!res.ok) {
    const responseBody = await res.text();
    throw new Error(
      `Failed to fetch salary information (${res.status} ${res.statusText})${responseBody ? `: ${responseBody}` : ""}`,
    );
  }
  const data: unknown = await res.json();
  if (!isSalaryInfo(data)) {
    throw new Error("Invalid salary information returned by the server");
  }
  return data;
}
