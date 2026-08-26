import { useEffect, useState } from "react";
import { loadSessionsHistory } from "../services/workoutSessions";
import GetAllSessions from "../components/gainsSquad/GetAllSessions";

const SessionHistory = () => {
  const [allSessions, setAllSessions] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const data = await loadSessionsHistory();

      if (!data) {
        return;
      }
      setAllSessions(data);
    };

    getHistory();
  }, []);

  return (
    <>
      <GetAllSessions allSessions={allSessions} />
    </>
  );
};

export default SessionHistory;
