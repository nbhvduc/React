import { useEmployeeInfo } from "../hooks/useEmployeeInfo";
import { useGetWorkingTimeMonth } from "../hooks/useGetWorkingTimeMonth.tsx";
import { useTotalWorkingDaysMonth } from "../hooks/useTotalWorkingDaysMonth.tsx";
import { useTotalWorkingNight } from "../hooks/useGetTotalWorkingNight.tsx";
import { formatMinutesJa } from "../utils/formatTime.ts";
import "./Home.css";

export function Home() {
  const { employee } = useEmployeeInfo();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const { totalTime } = useGetWorkingTimeMonth(year, month);
  const { workingDays } = useTotalWorkingDaysMonth(year, month);
  const { workingNight } = useTotalWorkingNight(year, month);

  const monthLabel = today.toLocaleDateString("ja-JP", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateTime = `${year}-${String(month).padStart(2, "0")}-${String(
    today.getDate(),
  ).padStart(2, "0")}`;

  return (
    <main className="home-content">
      <header className="header-and-label">
        <div className="home-header">
          <p className="home-greeting">お疲れ様です</p>
          <h1 className="home-user">{employee?.name ?? " "}様</h1>
        </div>
        <time className="monthLabelHome" dateTime={dateTime}>
          <svg
            aria-hidden="true"
            className="date-icon"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3v3m8-3v3M4.5 9h15M6 5.5h12A1.5 1.5 0 0 1 19.5 7v12A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7A1.5 1.5 0 0 1 6 5.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
          <span>{monthLabel}</span>
        </time>
      </header>

      <section className="attandance-time" aria-label="月間勤怠サマリー">
        <article className="time time--days">
          <div className="metric-top">
            <span className="emoji">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3v3m8-3v3M4.5 9h15M6 5.5h12A1.5 1.5 0 0 1 19.5 7v12A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7A1.5 1.5 0 0 1 6 5.5Zm3 7h.01M12 12.5h.01M15 12.5h.01M9 16h.01m3-.01h.01m2.99 0h.01"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </span>
            <span className="metric-period">今月</span>
          </div>
          <p className="time-title">今月の出勤日数</p>
          <p className="time-value">
            {workingDays?.total_work_day ?? "-"}
            {workingDays != null && <span className="time-unit">日</span>}
          </p>
        </article>

        <article className="time time--hours">
          <div className="metric-top">
            <span className="emoji">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </span>
            <span className="metric-period">今月</span>
          </div>
          <p className="time-title">今月の勤務時間</p>
          <p className="time-value">
            {totalTime?.total_work_times != null
              ? formatMinutesJa(totalTime.total_work_times)
              : "-"}
          </p>
        </article>

        <article className="time time--overtime">
          <div className="metric-top">
            <span className="emoji">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3v12m0 0 4-4m-4 4-4-4m-2 8h12a2 2 0 0 0 2-2v-3m-16 0v3a2 2 0 0 0 2 2Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </span>
            <span className="metric-period">今月</span>
          </div>
          <p className="time-title">今月の残業時間</p>
          <p className="time-value">
            {totalTime?.total_over_time != null
              ? formatMinutesJa(totalTime.total_over_time)
              : "-"}
          </p>
        </article>

        <article className="time time--night">
          <div className="metric-top">
            <span className="emoji">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
                <path
                  d="m17.5 4 .5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="metric-period">今月</span>
          </div>
          <p className="time-title">今月の夜勤時間</p>
          <p className="time-value">
            {workingNight?.total_work_night != null
              ? formatMinutesJa(workingNight.total_work_night)
              : "-"}
          </p>
        </article>
      </section>
    </main>
  );
}
