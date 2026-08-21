import { useEffect, useState } from "react";
import { loadExercise } from "../../services/exerciseDb";
import {
  exerciseDiv,
  mainList,
  exerciseName,
  pageButton,
} from "./styles/tailwindStyles";
import { Link } from "react-router-dom";

const ExercisesList = () => {
  const [exercise, setExercise] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [previousCursor, setPreviousCursor] =
    useState(null);

  useEffect(() => {
    const getExerciseData = async () => {
      const data = await loadExercise();

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
    });

    if (!data) return;

    setExercise(data.data);
    setNextCursor(data.meta.nextCursor);
    setPreviousCursor(data.meta.previousCursor);
  };

  return (
    <>
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
    </>
  );
};

export default ExercisesList;
