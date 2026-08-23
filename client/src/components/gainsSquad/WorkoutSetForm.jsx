import { useState } from "react";

import {
  workoutSetFormCard,
  workoutSetFormTitle,
  workoutSetForm,
  workoutSetFormInput,
  workoutSetFormLabel,
  workoutSetFormButton,
} from "./styles/tailwindStyles";

const emptySet = {
  exercise_id: "",
  set_number: "",
  reps: "",
  weight: "",
};

const WorkoutSetForm = ({ exercises, onSubmit }) => {
  const [setData, setSetData] = useState(emptySet);

  const handleChange = (e) => {
    setSetData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit(setData);

    setSetData(emptySet);
  };

  return (
    <div className={workoutSetFormCard}>
      <h2 className={workoutSetFormTitle}>
        Add Workout Set
      </h2>

      <form
        className={workoutSetForm}
        onSubmit={handleSubmit}
      >
        <label className={workoutSetFormLabel}>
          Exercise
        </label>

        <select
          className={workoutSetFormInput}
          name="exercise_id"
          value={setData.exercise_id}
          onChange={handleChange}
          required
        >
          <option value="">Select exercise</option>

          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.exercise_name}
            </option>
          ))}
        </select>

        <label className={workoutSetFormLabel}>
          Set Number
        </label>

        <input
          className={workoutSetFormInput}
          type="number"
          name="set_number"
          min="1"
          value={setData.set_number}
          onChange={handleChange}
          placeholder="Set number"
          required
        />

        <label className={workoutSetFormLabel}>Reps</label>

        <input
          className={workoutSetFormInput}
          type="number"
          name="reps"
          min="1"
          value={setData.reps}
          onChange={handleChange}
          placeholder="Reps"
          required
        />

        <label className={workoutSetFormLabel}>
          Weight
        </label>

        <input
          className={workoutSetFormInput}
          type="number"
          step="0.01"
          min="0"
          name="weight"
          value={setData.weight}
          onChange={handleChange}
          placeholder="Weight"
        />

        <button
          className={workoutSetFormButton}
          type="submit"
        >
          Add Set
        </button>
      </form>
    </div>
  );
};

export default WorkoutSetForm;
