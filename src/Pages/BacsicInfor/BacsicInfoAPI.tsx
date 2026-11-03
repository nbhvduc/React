export async function BacsicInfoAPI() {
  const token = localStorage.getItem("jwt");

  const response = await fetch("http://127.0.0.1:8000/users/get_employee", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch employee information");
  }
  return data;
}
