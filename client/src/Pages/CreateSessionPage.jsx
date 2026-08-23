import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createSession } from "../services/workoutSessions";
import CreateSessionCard from "../components/gainsSquad/CreateSessionCard";

const emptySession = {
  name: "",
  date: "",
  routine: "",
};

const CreateSessionPage = () => {
  const [sessionData, setSessionData] =
    useState(emptySession);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSessionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const created = await createSession(sessionData);

    if (!created) {
      return;
    }

    navigate("/history");
  };

  return (
    <>
      <CreateSessionCard
      sessionData={sessionData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
    </>
  );
};

export default CreateSessionPage;
