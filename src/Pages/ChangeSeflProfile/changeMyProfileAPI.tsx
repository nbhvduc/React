export async function ChangeMyProfileAPI(
  name: string,
  birthday: string,
  phone: string,
) {
  const token = localStorage.getItem("jwt");

  const response = await fetch(
    "http://127.0.0.1:8000/employee_self_update/employee_my_profile",
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        birthday,
        phone,
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(data.detail ?? "Failed to update profile"));
  }
  return data;
}
