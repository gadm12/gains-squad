//! http://127.0.0.1:8000/api/v1/calories/

import axios from "axios";

export const ninjaCalories = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/calories/",
});


ninjaCalories.interceptors.request.use((config) => {
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


export const calculateCalories = async (
  weight,
  duration,
) => {
  try {
    const response = await ninjaCalories.get(
      `${weight}/${duration}/`,
    );

    return response.data;
  } catch (error) {
    console.error(errorMessage(error));
    return null;
  }
};