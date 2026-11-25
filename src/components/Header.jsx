
import { Activity, Plus } from "lucide-react";

function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-icon">
          <Activity size={25} />
        </div>

        <div>
          <h1>Health And Fitness Tracker</h1>
          <p>Track your health. Build better habits.</p>
        </div>
      </div>

      <button className="add-button" onClick={onAddClick}>
        <Plus size={18} />
        + Add data
      </button>
    </header>
  );
}

export default Header;
