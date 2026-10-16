import { useEmployeeInfo } from "../hooks/useEmployeeInfo";
import "./Home.css";
export function Home() {
  const { employee } = useEmployeeInfo();
  const today = new Date();

  const monthLabel = today.toLocaleDateString("ja-JP", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="home-content">
      <div className="header-and-label">
        <div className="home-header">
          <div>お疲れ様です</div>
          <div>{employee?.name}様</div>
        </div>
        <div className="monthLabelHome">
          <div>{monthLabel}</div>
        </div>
      </div>
    </div>
  );
}
