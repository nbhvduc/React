import { useState } from "react";
import { useParams } from "react-router";
import "./SalaryDetail.css";

export function SalaryDetail() {
  const { year, month } = useParams();
  const yearAsNumber = Number(year);
  const monthAsNumber = Number(month);

  const [currentTime, setCurrentTime] = useState(
    new Date(yearAsNumber, monthAsNumber - 1),
  );

  const goToPreviousMonth = () => {
    setCurrentTime((prev) => {
      const newTime = new Date(prev);

      const newMonth = newTime.getMonth() - 1;

      newTime.setMonth(newMonth);

      return newTime;
    });
  };

  const goToNextMoth = () => {
    setCurrentTime((prev) => {
      const newTime = new Date(prev);

      const newMonth = newTime.getMonth() + 1;

      newTime.setMonth(newMonth);

      return newTime;
    });
  };

  const monthLabel = currentTime.toLocaleDateString("ja-JP", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="content-salary-container">
      <div className="goToPreviousMonth" onClick={goToPreviousMonth}>
        ＜先月
      </div>
      <div className="monthLabel">
        <span>{monthLabel}</span>
      </div>
      <div className="goToNextMonth" onClick={goToNextMoth}>
        ＞来月
      </div>
    </div>
  );
}
