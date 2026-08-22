import {
  sessionsDiv,
  sessionTable,
  sessionHeader,
  sessionRow,
  sessionData,
} from "./styles/tailwindStyles";

const GetAllSessions = ({ allSessions }) => {
  return (
    <div className={sessionsDiv}>
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
            >
              <td className={sessionData}>{index + 1}</td>
              <td className={sessionData}>{item.date}</td>
              <td className={sessionData}>{item.routine}</td>
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