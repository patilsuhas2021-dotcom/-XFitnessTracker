
import { CalendarDays, Flame, Utensils, Pencil, Trash2 } from "lucide-react";

function formatDate(dateString) {
  if (!dateString) return "No date";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function RecentStatistics({
  records,
  onEdit,
  onDelete,
}) {
  // Show the newest records first.
  const sortedRecords = [...records].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <section className="statistics-section">
      <div className="section-heading">
        <div>
          <h2>Recent Health Statistics</h2>
          <p>Review and manage your daily health records.</p>
        </div>

        <span className="record-count">
          {records.length} {records.length === 1 ? "Record" : "Records"}
        </span>
      </div>

      {records.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <CalendarDays size={30} />
          </div>

          <h3>No health records yet</h3>

          <p>
            Start tracking your daily calories by clicking
            the + Add data button.
          </p>
        </div>
      ) : (
        <div className="records-list">
          {sortedRecords.map((record) => (
            <article className="record-card" key={record.id}>

              <div className="record-top">
                <div className="record-date">
                  <CalendarDays size={17} />
                  <span>{formatDate(record.date)}</span>
                </div>

                <div className="record-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit(record)}
                    aria-label={`Edit record for ${record.date}`}
                  >
                    <Pencil size={16} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(record.id)}
                    aria-label={`Delete record for ${record.date}`}
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="record-metrics">

                <div className="metric-item">
                  <div className="metric-icon intake-icon">
                    <Utensils size={19} />
                  </div>

                  <div>
                    <p>Calories Intake</p>
                    <h3>
                      {Number(record.caloriesIntake).toLocaleString("en-IN")}
                      <span> kcal</span>
                    </h3>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-icon burned-icon">
                    <Flame size={19} />
                  </div>

                  <div>
                    <p>Calories Burned</p>
                    <h3>
                      {Number(record.caloriesBurned).toLocaleString("en-IN")}
                      <span> kcal</span>
                    </h3>
                  </div>
                </div>

              </div>

              {record.description && (
                <div className="record-description">
                  <p>{record.description}</p>
                </div>
              )}

            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentStatistics;
