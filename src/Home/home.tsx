import { useEffect } from "react";
import { useUser } from "../context/userProvider";

export const Home = () => {
  const { setUser } = useUser();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://127.0.0.1:8000/users/get_user", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
          },
        });
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }

    fetchUser();
  }, [setUser]);

  return <div>Welcome to Home Page</div>;
};
