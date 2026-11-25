
import { useState } from "react";
import { X } from "lucide-react";

function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Prepare initial form values based on Add or Edit mode.
function getInitialFormData(mode, initialData) {
  if (mode === "edit" && initialData) {
    return {
      date: initialData.date || getTodayDate(),
      caloriesIntake: String(initialData.caloriesIntake ?? ""),
      caloriesBurned: String(initialData.caloriesBurned ?? ""),
      description: initialData.description || "",
    };
  }

  return {
    date: getTodayDate(),
    caloriesIntake: "",
    caloriesBurned: "",
    description: "",
  };
}

function HealthForm({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  initialData = null,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(mode, initialData)
  );

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.description.trim()) {
      alert("Please enter a short description.");
      return;
    }

    if (
      Number(formData.caloriesIntake) < 0 ||
      Number(formData.caloriesBurned) < 0
    ) {
      alert("Calories cannot be negative.");
      return;
    }

    const record = {
      date: formData.date,
      caloriesIntake: Number(formData.caloriesIntake),
      caloriesBurned: Number(formData.caloriesBurned),
      description: formData.description.trim(),
    };

    onSubmit(record);
  };

  const isEditMode = mode === "edit";

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="health-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="health-form-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="health-form-title">
              {isEditMode
                ? "Let's see what you want to change!"
                : "Add Data"}
            </h2>

            <p>
              {isEditMode
                ? "Update your daily health information."
                : "Enter your daily health information."}
            </p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="caloriesIntake">
              Calories Intake
            </label>
            <input
              id="caloriesIntake"
              type="number"
              name="caloriesIntake"
              placeholder="Enter Today's Calorie Intake"
              value={formData.caloriesIntake}
              onChange={handleChange}
              min="0"
              step="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="caloriesBurned">
              Calories Burned
            </label>
            <input
              id="caloriesBurned"
              type="number"
              name="caloriesBurned"
              placeholder="Enter Today's Calorie Burned"
              value={formData.caloriesBurned}
              onChange={handleChange}
              min="0"
              step="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Short Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HealthForm;
