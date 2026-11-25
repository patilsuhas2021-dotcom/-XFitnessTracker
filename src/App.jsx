
import { useEffect, useState } from "react";

import Header from "./components/Header";
import HealthForm from "./components/HealthForm";
import RecentStatistics from "./components/RecentStatistics";
import OverallData from "./components/OverallData";
import WeeklyTrends from "./components/WeeklyTrends";

import "./App.css";

const STORAGE_KEY = "healthAndFitness";

function App() {
  // Load saved records when the component initializes.
  const [records, setRecords] = useState(() => {
    try {
      const savedRecords = localStorage.getItem(STORAGE_KEY);

      if (savedRecords) {
        const parsedRecords = JSON.parse(savedRecords);

        if (Array.isArray(parsedRecords)) {
          return parsedRecords;
        }

        console.error("Saved health data is not an array.");
      }
    } catch (error) {
      console.error("Error loading health records:", error);
    }

    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Save records whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(records)
      );
    } catch (error) {
      console.error("Error saving health records:", error);
    }
  }, [records]);

  // Open Add Data modal.
  const handleAddClick = () => {
    setFormMode("add");
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  // Open Edit modal.
  const handleEditClick = (record) => {
    setFormMode("edit");
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  // Delete a record using filter().
  const handleDelete = (recordId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this health record?"
    );

    if (!confirmed) return;

    setRecords((previousRecords) =>
      previousRecords.filter(
        (record) => record.id !== recordId
      )
    );
  };

  // Close modal.
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // Add or update a record.
  const handleFormSubmit = (formData) => {
    if (formMode === "edit" && selectedRecord) {
      setRecords((previousRecords) =>
        previousRecords.map((record) =>
          record.id === selectedRecord.id
            ? { ...record, ...formData }
            : record
        )
      );
    } else {
      const newRecord = {
        id: crypto.randomUUID(),
        ...formData,
      };

      setRecords((previousRecords) => [
        ...previousRecords,
        newRecord,
      ]);
    }

    handleCloseModal();
  };

  return (
    <div className="app-container">
      <Header onAddClick={handleAddClick} />

      <main className="dashboard">
        {/* Recent Health Statistics */}
        <RecentStatistics
          records={records}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />

        <section className="chart-section">
          {/* Overall Data Pie Chart */}
          <OverallData records={records} />

          {/* Weekly Health Trends Bar Chart */}
          {records.length > 0 && (
            <WeeklyTrends records={records} />
          )}
        </section>
      </main>

      {/* Add/Edit modal */}
      <HealthForm
        key={
          isModalOpen
            ? `${formMode}-${selectedRecord?.id || "new"}`
            : "closed"
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        mode={formMode}
        initialData={selectedRecord}
      />
    </div>
  );
}

export default App;
