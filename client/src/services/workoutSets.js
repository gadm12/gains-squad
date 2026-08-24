import axios from "axios";

export const workoutSets = axios.create({
  baseURL: "/api/v1/workout/",
});

workoutSets.interceptors.request.use((config) => {
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

export const createSet = async (sessionId, setData) => {
  try {
    const response = await workoutSets.post(
      `sessions/${sessionId}/sets/`,
      setData,
    );

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const loadSet = async (id) => {
  try {
    const response = await workoutSets.get(`sets/${id}/`);

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const updateSet = async (id, setData) => {
  try {
    const response = await workoutSets.patch(
      `sets/${id}/`,
      setData,
    );

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};

export const deleteSet = async (id) => {
  try {
    await workoutSets.delete(`sets/${id}/`);

    return true;
  } catch (error) {
    console.error(errorMessage(error));
    return false;
  }
};
