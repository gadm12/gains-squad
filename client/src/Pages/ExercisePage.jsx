import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadSingleExercise } from "../services/exerciseDb";
import NotFoundPage from "./NotFoundPage";
import ExerciseCard from "../components/ExerciseDb/ExerciseCard";

const ExercisePage = () => {
  const [singleExercise, setSingleExercise] =
    useState(null);

  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getSingleExerciseData = async () => {
      const data = await loadSingleExercise(`${id}`);

      if (!data) {
        setNotFound(true);
        return;
      }

      setSingleExercise(data.data);
      setNotFound(false);
    };

    getSingleExerciseData();
  }, [id]);

  if (notFound) {
    return <NotFoundPage searchedName={id} />;
  }

  if (!singleExercise) {
    return <p>spinner...</p>;
  }

  return (
    <>
      <ExerciseCard singleExercise={singleExercise} />
    </>
  );
};

export default ExercisePage;
