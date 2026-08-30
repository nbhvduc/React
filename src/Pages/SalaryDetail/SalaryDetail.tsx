import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";

import './SalaryDetail.css'

export function SalaryDetail() {
  const { year, month } = useParams();
  const monthAsNumber = Number(month) - 1
  const yearAsNumber = Number(year)

  const [currentDate, setCurrentDate] = useState(new Date(yearAsNumber, monthAsNumber))

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      // prevDate = 5/2026
      const newDate = new Date(prevDate);

      // 5 - 1 = 4
      const month = newDate.getMonth() - 1

      newDate.setMonth(month);
      // newDate = 4/2026

      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      // prevDate = 5/2026
      const newDate = new Date(prevDate);
      // 5 + 1 = 6
      const month = newDate.getMonth() + 1

      newDate.setMonth(month);
      // newDate = 6/2026

      return newDate;
    });
  };

  const monthLabel = currentDate.toLocaleDateString("ja-JP", {
    month: "short",
    year: "numeric",
  });

  const getSalaryDetail = useCallback(() => {
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    console.log(`Call API to get salary detail with ${month} ${year}`)
  }, [currentDate])

  useEffect(() => {
    getSalaryDetail()
  }, [getSalaryDetail])

  return (
    <div>
      <div className="calender-navigation-header">
        <button onClick={goToPreviousMonth}>← Trước</button>
        <span>{monthLabel}</span>
        <button onClick={goToNextMonth}>Sau →</button>
      </div>

      <div className="content">

      </div>
    </div>
  );
}
