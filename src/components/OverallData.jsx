
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./OverallData.css";

function OverallData({ records = [] }) {

  // Calculate total calories intake
  const totalIntake = records.reduce((total, record) => {
    const value = Number(record.caloriesIntake);

    return total + (Number.isFinite(value) ? value : 0);
  }, 0);

  // Calculate total calories burned
  const totalBurned = records.reduce((total, record) => {
    const value = Number(record.caloriesBurned);

    return total + (Number.isFinite(value) ? value : 0);
  }, 0);

  // Prepare data for Recharts
  const chartData = [
    {
      name: "Calories Intake",
      value: totalIntake,
    },
    {
      name: "Calories Burned",
      value: totalBurned,
    },
  ];

  const COLORS = ["#6366f1", "#f59e0b"];

  const hasData = totalIntake + totalBurned > 0;

  return (
    <section className="overall-data-card">

      <h2>Overall Data</h2>

      {/* Pie Chart remains mounted */}
      <div className="pie-chart-container">

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={95}
              innerRadius={55}
              paddingAngle={4}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString()} kcal`,
                "Calories",
              ]}
            />

            <Legend verticalAlign="bottom" />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {hasData ? (
        <div className="overall-summary">

          <div>
            <span className="summary-label">
              Total Calories Intake
            </span>

            <strong>
              {totalIntake.toLocaleString()} kcal
            </strong>
          </div>

          <div>
            <span className="summary-label">
              Total Calories Burned
            </span>

            <strong>
              {totalBurned.toLocaleString()} kcal
            </strong>
          </div>

        </div>
      ) : (
        <div className="empty-chart">
          <p>No health data available yet.</p>

          <span>
            Add your daily health records to see your overall data.
          </span>
        </div>
      )}

    </section>
  );
}

export default OverallData;
