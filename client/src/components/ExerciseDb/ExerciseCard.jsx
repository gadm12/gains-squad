import { useNavigate } from "react-router-dom";

import {
  backButton,
  exerciseDetailDiv,
  exerciseDetailEquipment,
  exerciseDetailImage,
  exerciseDetailName,
  exerciseDetailTarget,
  instructionHeader,
  instructionLine,
  instructionList,
} from "./styles/tailwindStyles";

const ExerciseCard = ({ singleExercise }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={exerciseDetailDiv}>
        <h1 className={exerciseDetailName}>
          {singleExercise.name}
        </h1>

        <h3 className={exerciseDetailTarget}>
          Targets: {singleExercise.bodyParts.join(", ")}
        </h3>

        <h4 className={exerciseDetailEquipment}>
          Equipment used:{" "}
          {singleExercise.equipments.join(", ")}
        </h4>

        <img
          className={exerciseDetailImage}
          src={singleExercise.gifUrl}
          alt="visual aid not available follow the instructions"
        />

        <h4 className={instructionHeader}>
          Workout Instructions
        </h4>

        <hr className={instructionLine} />

        <ol className={instructionList}>
          {singleExercise.instructions.map(
            (instruction, index) => (
              <li key={index}>{instruction}</li>
            ),
          )}
        </ol>

        <button
          className={backButton}
          aria-label="Go Back"
          title="Go Back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
    </>
  );
};

export default ExerciseCard;
