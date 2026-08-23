import { useState } from "react";

import {
  workoutSetsListCard,
  workoutSetsListTitle,
  workoutSetsTable,
  workoutSetsHeader,
  workoutSetsRow,
  workoutSetsData,
  workoutSetsInput,
  workoutSetsEditButton,
  workoutSetsDeleteButton,
  workoutSetsCancelButton,
} from "./styles/tailwindStyles";

const WorkoutSetsList = ({ sets, onUpdate, onDelete }) => {
  const [editingSetId, setEditingSetId] = useState(null);

  const [editData, setEditData] = useState({
    set_number: "",
    reps: "",
    weight: "",
  });

  const handleEdit = (workoutSet) => {
    setEditingSetId(workoutSet.id);

    setEditData({
      set_number: workoutSet.set_number,
      reps: workoutSet.reps,
      weight: workoutSet.weight || "",
    });
  };

  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (setId) => {
    await onUpdate(setId, editData);
    setEditingSetId(null);
  };

  const handleCancel = () => {
    setEditingSetId(null);
  };

  return (
    <div className={workoutSetsListCard}>
      <h2 className={workoutSetsListTitle}>Workout Sets</h2>

      <table className={workoutSetsTable}>
        <thead>
          <tr>
            <th className={workoutSetsHeader}>Exercise</th>

            <th className={workoutSetsHeader}>Set</th>

            <th className={workoutSetsHeader}>Reps</th>

            <th className={workoutSetsHeader}>Weight</th>

            <th className={workoutSetsHeader}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sets.map((workoutSet) => (
            <tr
              className={workoutSetsRow}
              key={workoutSet.id}
            >
              <td className={workoutSetsData}>
                {workoutSet.exercise?.exercise_name}
              </td>

              {editingSetId === workoutSet.id ? (
                <>
                  <td className={workoutSetsData}>
                    <input
                      className={workoutSetsInput}
                      type="number"
                      name="set_number"
                      value={editData.set_number}
                      onChange={handleChange}
                    />
                  </td>

                  <td className={workoutSetsData}>
                    <input
                      className={workoutSetsInput}
                      type="number"
                      name="reps"
                      value={editData.reps}
                      onChange={handleChange}
                    />
                  </td>

                  <td className={workoutSetsData}>
                    <input
                      className={workoutSetsInput}
                      type="number"
                      step="0.01"
                      name="weight"
                      value={editData.weight}
                      onChange={handleChange}
                    />
                  </td>

                  <td className={workoutSetsData}>
                    <button
                      className={workoutSetsEditButton}
                      onClick={() =>
                        handleSave(workoutSet.id)
                      }
                    >
                      Save
                    </button>

                    <button
                      className={workoutSetsCancelButton}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className={workoutSetsData}>
                    {workoutSet.set_number}
                  </td>

                  <td className={workoutSetsData}>
                    {workoutSet.reps}
                  </td>

                  <td className={workoutSetsData}>
                    {workoutSet.weight}
                  </td>

                  <td className={workoutSetsData}>
                    <button
                      className={workoutSetsEditButton}
                      onClick={() => handleEdit(workoutSet)}
                    >
                      Edit
                    </button>

                    <button
                      className={workoutSetsDeleteButton}
                      onClick={() =>
                        onDelete(workoutSet.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutSetsList;
