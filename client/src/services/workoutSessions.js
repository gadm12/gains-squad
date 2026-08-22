import axios from "axios";

//! http://127.0.0.1:8000/api/v1/workout/sessions/
//! http://127.0.0.1:8000/api/v1/workout/sessions/<int:id>/

export const workoutSessions = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/workout/sessions/",
});

workoutSessions.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
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
  }
};
