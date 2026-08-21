import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadSingleExercise } from "../services/exerciseDb";
import NotFoundPage from "./NotFoundPage";

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
      <h1>{singleExercise.name}</h1>
      <h3>targets {singleExercise.bodyParts.join(", ")}</h3>
      <h4>
        equipment used:{" "}
        {singleExercise.equipments.join(", ")}
      </h4>
      <img
        src={singleExercise.gifUrl}
        alt="visual aid not available follow the instructions"
      />
      <h4>workout instruction</h4>
      <hr />
      <ol className="list-decimal pl-6">
        {singleExercise.instructions.map(
          (instruction, index) => (
            <li key={index}>{instruction}</li>
          ),
        )}
      </ol>
    </>
  );
};

export default ExercisePage;
