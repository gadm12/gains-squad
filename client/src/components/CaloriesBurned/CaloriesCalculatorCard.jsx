import WarpText from "../ReactBits/WarpText";

import {
  caloriesCard,
  warpTextDiv,
  caloriesTitle,
  caloriesForm,
  caloriesInput,
  caloriesButton,
  caloriesResult,
  caloriesResultTitle,
  caloriesResultValue,
  apiNinjasCredit,
  apiNinjasLink,
} from "./styles/tailwindStyles";

const CaloriesCalculatorCard = ({
  weight,
  duration,
  result,
  setWeight,
  setDuration,
  onSubmit,
}) => {
  return (
    <div className={caloriesCard}>
      <div className={warpTextDiv}>
        <WarpText
          className={caloriesTitle}
          text="Calculate Your Calories"
          color="#FFFFFF"
          warpStrength={0.08}
          warpScale={1.7}
          speed={0.55}
          pointerInfluence={0.42}
          pointerStrength={0.36}
          refraction={0.018}
          ripple
          fontSize={90}
          fontWeight={800}
          style={{ height: "10px" }}
          fontFamily="inherit"
          letterSpacing={-0.06}
          lineHeight={0.93}
        />
      </div>

      <form className={caloriesForm} onSubmit={onSubmit}>
        <input
          className={caloriesInput}
          type="number"
          placeholder="Body weight (lbs)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
          className={caloriesInput}
          type="number"
          placeholder="Workout duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button className={caloriesButton} type="submit">
          Calculate Calories
        </button>
      </form>

      {result?.results?.length > 0 && (
        <div className={caloriesResult}>
          <h3 className={caloriesResultTitle}>
            Calories Burned
          </h3>

          <p className={caloriesResultValue}>
            {result.results[0].total_calories}
          </p>
        </div>
      )}
      <div className={apiNinjasCredit}>
        <span>Powered by</span>

        <a
          href="https://api-ninjas.com"
          target="_blank"
          rel="noopener noreferrer"
          className={apiNinjasLink}
        >
          API Ninjas
        </a>
      </div>
    </div>
  );
};

export default CaloriesCalculatorCard;
