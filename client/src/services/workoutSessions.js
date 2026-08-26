import axios from "axios";

export const workoutSessions = axios.create({
  baseURL: "/api/v1/workout/sessions/",
  withCredentials: true,
});

const errorMessage = (error) => {
  const data = error.response?.data;
  if (!data) {
    return "Could not reach the server";
  }
  return typeof data === "string"
    ? data
    : JSON.stringify(data);
};

export const loadSessionsHistory = async (params = {}) => {
  try {
    const response = await workoutSessions.get("", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const loadSingleSession = async (id) => {
  try {
    const response = await workoutSessions.get(`${id}/`);
    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const createSession = async (sessionData) => {
  try {
    const response = await workoutSessions.post(
      "",
      sessionData,
    );

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const updateSession = async (id, sessionData) => {
  try {
    const response = await workoutSessions.patch(
      `${id}/`,
      sessionData,
    );

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const deleteSession = async (id) => {
  try {
    await workoutSessions.delete(`${id}/`);
    return true;
  } catch (error) {
    console.error(errorMessage(error));
    return false;
  }
};
