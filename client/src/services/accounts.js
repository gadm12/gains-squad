import axios from "axios";

export const user = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/users/",
});

user.interceptors.request.use((config) => {
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

export const signUp = async (email, password) => {
  try {
    const response = await user.post("signup/", {
      email,
      password,
    });
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    return {
      user,
      error: null,
    };
  } catch (error) {
    console.error(errorMessage(error));
    return { user: null, error: errorMessage(error) };
  }
};

export const logIn = async (email, password) => {
  try {
    const response = await user.post("login/", {
      email,
      password,
    });
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    return {
      user,
      error: null,
    };
  } catch (error) {
    console.error(errorMessage(error));
    return {
      user: null,
      error: errorMessage(error),
    };
  }
};
