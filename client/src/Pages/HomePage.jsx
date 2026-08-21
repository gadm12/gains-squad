import ExercisesList from "../components/ExerciseDb/ExercisesList";

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        {/* <h1 className="flex text-4xl font-bold text-black text-shadow-lg border-4 bg-indigo-500 bg-clip-border p-3">
          Main Page
        </h1> */}
        <ExercisesList />
        
      </div>
    </>
  );
}

{
  /* <ul>
          {exercise.map((item) => (
            <li key={item.exerciseId}>{item.name}</li>
          ))}
        </ul>
        <button
          onClick={getPreviousPage}
          disabled={!previousCursor}
        >
          Previous
        </button>
        <button
          onClick={getNextPage}
          disabled={!nextCursor}
        >
          Next
        </button> */
}

// const [exercise, setExercise] = useState([]);
// const [nextCursor, setNextCursor] = useState(null);
// const [previousCursor, setPreviousCursor] =
//   useState(null);

// useEffect(() => {
//   const getExerciseData = async () => {
//     const response = await axios.get(
//       "https://oss.exercisedb.dev/api/v1/exercises",
//     );
//     console.log(response.data.data);
//     setExercise(response.data.data);
//     setNextCursor(response.data.meta.nextCursor);
//   };

//   getExerciseData();
// }, []);

// const getNextPage = async () => {
//   if (!nextCursor) return;

//   const response = await axios.get(
//     "https://oss.exercisedb.dev/api/v1/exercises",
//     {
//       params: {
//         after: nextCursor,
//       },
//     },
//   );

//   setExercise(response.data.data);
//   setNextCursor(response.data.meta.nextCursor);
//   setPreviousCursor(response.data.meta.previousCursor);
// };

// const getPreviousPage = async () => {
//   if (!previousCursor) return;

//   const response = await axios.get(
//     "https://oss.exercisedb.dev/api/v1/exercises",
//     {
//       params: {
//         after: previousCursor,
//       },
//     },
//   );

//   setExercise(response.data.data);
//   setNextCursor(response.data.meta.nextCursor);
//   setPreviousCursor(response.data.meta.previousCursor);
// };
