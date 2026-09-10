import { useUser } from "../../context/userProvider";

export function ChangePassword() {
  const { user } = useUser();

  return (
    <div>
      <header className="header-salary">{user?.name}</header>
      <div>Call API</div>
    </div>
  );
}
