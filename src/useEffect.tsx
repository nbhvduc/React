import { useState, useEffect } from "react";

export function SearchUser() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }
    async function handleApiSearchUser() {
      setLoading(true);

      try {
        const response = await fetch("http://127.0.0.1:8000/users/get_user", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        setUsers(data);
        console.log(data);

        if (!response.ok) {
          setErrorMessage(data.detail);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    handleApiSearchUser();
  }, [search]);
  console.log(search);

  function handleSearchUser(even: any) {
    setSearch(even.target.value);
  }

  return (
    <div>
      <input value={search} type="text" onChange={handleSearchUser} />
      <div>hien thi user o day</div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
