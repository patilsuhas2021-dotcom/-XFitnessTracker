
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useState } from "react";

import "./WeeklyTrends.css";

function WeeklyTrends({ records = [] }) {
  // Convert Date object into YYYY-MM-DD
  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Generate the last 7 calendar days, including today
  const [today] = useState(() => new Date());

  const weeklyDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - (6 - index)
    );

    return {
      fullDate: getDateKey(date),
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
      }),
      caloriesIntake: 0,
      caloriesBurned: 0,
    };
  });

  // Create a lookup for the seven calendar dates
  const weeklyDataMap = new Map(
    weeklyDates.map((item) => [item.fullDate, item])
  );

  // Track whether at least one actual record exists in this week
  let hasRecentRecords = false;

  // Filter and calculate weekly records
  records.forEach((record) => {
    if (!record.date) return;

    // Date input values are already in YYYY-MM-DD format
    const dateKey = record.date;

    const matchingDay = weeklyDataMap.get(dateKey);

    if (matchingDay) {
      hasRecentRecords = true;

      const intake = Number(record.caloriesIntake);
      const burned = Number(record.caloriesBurned);

      matchingDay.caloriesIntake += Number.isFinite(intake)
        ? intake
        : 0;

      matchingDay.caloriesBurned += Number.isFinite(burned)
        ? burned
        : 0;
    }
  });

  // Prepare final chart data
  const chartData = weeklyDates.map((item) => ({
    date: item.date,
    caloriesIntake: item.caloriesIntake,
    caloriesBurned: item.caloriesBurned,
  }));

  return (
    <section className="weekly-trends-card">

      <h2>Weekly Health Trends</h2>

      <div className="weekly-chart-container">

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 5,
              bottom: 5,
            }}
            barGap={6}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              width={55}
            />

            <Tooltip
              formatter={(value, name) => [
                `${Number(value).toLocaleString()} kcal`,
                name,
              ]}
            />

            <Legend />

            <Bar
              dataKey="caloriesIntake"
              name="Calories Intake"
              fill="#6366f1"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="caloriesBurned"
              name="Calories Burned"
              fill="#f59e0b"
              radius={[5, 5, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {!hasRecentRecords && (
        <p className="weekly-empty-message">
          No health records found in the last 7 calendar days.
        </p>
      )}

    </section>
  );
}

export default WeeklyTrends;
