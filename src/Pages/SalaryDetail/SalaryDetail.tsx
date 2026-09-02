import { useState, useEffect } from "react";
import { useParams } from "react-router";

export function SalaryDetail() {
  const { year, month } = useParams();
  const yearAsNumber = Number(year);
  const monthAsNumber = Number(month);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);

  const [currentTime, setCurrentTime] = useState(
    new Date(yearAsNumber, monthAsNumber),
  );

  const goToPreviousMonth = () => {
    setCurrentTime((prev) => {
      const newTime = new Date(prev);

      const newMonth = newTime.getMonth() - 1;

      newTime.setMonth(newMonth);

      return newTime;
    });

    const gotoNextMoth = () => {
      setCurrentTime((prev) => {
        const newTime = new Date(prev);

        const newMonth = newTime.getMonth() + 1;

        newTime.setMonth(newMonth);

        return newTime;
      });
    };
  };

  useEffect(() => {
    async function fetchAllUsers() {
      setLoading(true);

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/users/get_all_users",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          },
        );
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

    fetchAllUsers();
  }, []);

  return (
    <ul>
      {users.map((user: any) => {
        return (
          <li key={user.id}>
            <p> {user.id}</p>
            <p> {user.email}</p>
            <p> {user.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
