import { useEffect, useState } from "react";
import { loadExercise } from "../../services/exerciseDb";
import {
  exerciseDiv,
  mainList,
  exerciseName,
  pageButton,
  twoButtons,
  textTypeDiv,
  exerciseListDiv,
} from "./styles/tailwindStyles";
import { Link } from "react-router-dom";
import TextType from "../ReactBits/TextType";

const ExercisesList = () => {
  const [exercise, setExercise] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [previousCursor, setPreviousCursor] =
    useState(null);

  useEffect(() => {
    const getExerciseData = async () => {
      const data = await loadExercise({
        limit: 20,
      });

      if (!data) {
        return;
      }
      console.log(data.data);
      setExercise(data.data);
      setNextCursor(data.meta.nextCursor);
      setPreviousCursor(data.meta.previousCursor);
    };

    getExerciseData();
  }, []);

  const getNextPage = async () => {
    if (!nextCursor) return;

    const data = await loadExercise({
      after: nextCursor,
      limit: 20,
    });

    if (!data) return;

    setExercise(data.data);
    setNextCursor(data.meta.nextCursor);
    setPreviousCursor(data.meta.previousCursor);
  };

  const getPreviousPage = async () => {
    if (!previousCursor) return;

    const data = await loadExercise({
      before: previousCursor,
      limit: 20,
    });

    if (!data) return;

    setExercise(data.data);
    setNextCursor(data.meta.nextCursor);
    setPreviousCursor(data.meta.previousCursor);
  };

  return (
    <>
      <div className={exerciseListDiv}>
        <div className={textTypeDiv}>
          <TextType
            text={["Welcome to ExerciseDB Workout Library"]}
            typingSpeed={50}
            pauseDuration={5000}
            showCursor
            cursorCharacter="▎"
            deletingSpeed={50}
            
            cursorBlinkDuration={0.5}
          />
        </div>
        <div className={exerciseDiv}>
          <ol className={mainList}>
            {exercise.map((item) => (
              <li
                className={exerciseName}
                key={item.exerciseId}
              >
                {" "}
                <Link to={`/exercise/${item.exerciseId}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ol>
          <div className={twoButtons}>
            <button
              className={pageButton}
              onClick={getPreviousPage}
              disabled={!previousCursor}
            >
              Previous
            </button>
            <button
              className={pageButton}
              onClick={getNextPage}
              disabled={!nextCursor}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisesList;
