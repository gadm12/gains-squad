import axios from "axios";

export const exerciseDb = axios.create({
  baseURL: "https://oss.exercisedb.dev/api/v1/exercises",
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

export const loadExercise = async (params = {}) => {
  try {
    const response = await exerciseDb.get("", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const loadSingleExercise = async (id) => {
  try {
    const response = await exerciseDb.get(`/${id}`); 
    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};