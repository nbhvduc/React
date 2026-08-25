import { useParams } from "react-router";

export function SalaryDetail() {
  const { year, month } = useParams();
  return (
    <div>
      <p>
        {year} {month}
        <p>Call API</p>
      </p>
    </div>
  );
}
