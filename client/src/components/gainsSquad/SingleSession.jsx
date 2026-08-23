import { useState } from "react";

import {
  singleSessionCard,
  singleSessionLabel,
  editSessionInput,
  singleSessionButtons,
  editSessionButton,
  deleteSessionButton,
  inputDiv,
  cancelSessionButton,
} from "./styles/tailwindStyles";

const SingleSession = ({
  session,
  saving,
  onSave,
  onCancelEdit,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    name: session.name || "",
    date: session.date || "",
    routine: session.routine || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={singleSessionCard}>
      <form onSubmit={handleSubmit}>
        <div className={inputDiv}>
          <label
            className={singleSessionLabel}
            htmlFor="name"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={editSessionInput}
          />
        </div>

        <div className={inputDiv}>
          <label
            className={singleSessionLabel}
            htmlFor="date"
          >
            Date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className={editSessionInput}
          />
        </div>

        <div className={inputDiv}>
          <label
            className={singleSessionLabel}
            htmlFor="routine"
          >
            Routine
          </label>

          <select
            id="routine"
            name="routine"
            value={formData.routine}
            onChange={handleChange}
            className={editSessionInput}
          >
            <option value="push">Push</option>
            <option value="pull">Pull</option>
            <option value="legs">Legs</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={singleSessionButtons}>
          <button
            type="submit"
            className={editSessionButton}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            className={cancelSessionButton}
            onClick={onCancelEdit}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className={deleteSessionButton}
            onClick={onDelete}
            disabled={saving}
          >
            Delete Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleSession;
