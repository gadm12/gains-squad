import { useNavigate } from "react-router-dom";
import WarpText from "../ReactBits/WarpText";

import {
  createSessionDiv,
  warpTextDiv,
  createClass,
  createSessionForm,
  createSessionInput,
  createSessionSelect,
  createSessionButton,
  backButton,
  goBackDiv,
} from "./styles/tailwindStyles";

const CreateSessionCard = ({
  sessionData,
  onChange,
  onSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <div className={createSessionDiv}>
      <div className={warpTextDiv}>
        <WarpText
          className={createClass}
          text="Create Workout Session"
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

      <form
        className={createSessionForm}
        onSubmit={onSubmit}
      >
        <input
          className={createSessionInput}
          name="name"
          type="text"
          value={sessionData.name}
          onChange={onChange}
          placeholder="Workout name"
        />

        <input
          className={createSessionInput}
          name="date"
          type="date"
          value={sessionData.date}
          onChange={onChange}
        />

        <select
          className={createSessionSelect}
          name="routine"
          value={sessionData.routine}
          onChange={onChange}
        >
          <option value="">Select routine</option>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="legs">Legs</option>
          <option value="other">Other</option>
        </select>

        <button
          className={createSessionButton}
          type="submit"
        >
          Create Session
        </button>

        <div className={goBackDiv}>
          <button
            className={backButton}
            aria-label="Go Back"
            title="Go Back"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionCard;
