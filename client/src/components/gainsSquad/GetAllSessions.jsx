import {
  sessionTable,
  sessionHeader,
  sessionRow,
  sessionData,
  historyTitle,
  historyDiv,
  historyWarpTextDiv,
} from "./styles/tailwindStyles";

import { useNavigate } from "react-router-dom";
import WarpText from "../ReactBits/WarpText";

const GetAllSessions = ({ allSessions }) => {
  const navigate = useNavigate();

  return (
    <div className={historyDiv}>
      <div className={historyWarpTextDiv}>
        <WarpText
          className={historyTitle}
          text="Workout History"
          color="#FFFFFF"
          warpStrength={0.08}
          warpScale={1.7}
          speed={0.55}
          pointerInfluence={0.42}
          pointerStrength={0.36}
          refraction={0.018}
          ripple
          fontSize={60}
          fontWeight={800}
          style={{ height: "10px" }}
          fontFamily="inherit"
          letterSpacing={-0.06}
          lineHeight={0.93}
        />
      </div>

      <table className={sessionTable}>
        <thead>
          <tr>
            <th className={sessionHeader}>#</th>
            <th className={sessionHeader}>Date</th>
            <th className={sessionHeader}>Routine</th>
            <th className={sessionHeader}>Name</th>
            <th className={sessionHeader}>Exercises</th>
            <th className={sessionHeader}>Total Volume</th>
          </tr>
        </thead>

        <tbody>
          {allSessions.map((item, index) => (
            <tr
              className={sessionRow}
              key={item.id}
              onClick={() =>
                navigate(`/history/${item.id}`)
              }
            >
              <td className={sessionData}>{index + 1}</td>
              <td className={sessionData}>{item.date}</td>
              <td className={sessionData}>
                {item.routine}
              </td>
              <td className={sessionData}>{item.name}</td>
              <td className={sessionData}>
                {item.sets.length}
              </td>
              <td className={sessionData}>
                {item.training_volume}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllSessions;
