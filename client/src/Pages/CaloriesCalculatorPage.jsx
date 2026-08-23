import { useState } from "react";
import { calculateCalories } from "../services/caloriesServer";
import CaloriesCalculatorCard from "../components/CaloriesBurned/CaloriesCalculatorCard";

const CaloriesCalculatorPage = () => {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await calculateCalories(weight, duration);
    console.log("CALORIE DATA:", data);
    if (!data) {
      return;
    }

    setResult(data);
  };

  return (
    <>
      <CaloriesCalculatorCard
        weight={weight}
        duration={duration}
        result={result}
        setWeight={setWeight}
        setDuration={setDuration}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CaloriesCalculatorPage;
