import axios from "axios";

export const exerciseLibrary = axios.create({
  baseURL: "/api/v1/workout/library/",
});

exerciseLibrary.interceptors.request.use((config) => {
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

export const loadExerciseLibrary = async () => {
  try {
    const response = await exerciseLibrary.get("");

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return [];
  }
};
