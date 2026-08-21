import axios from "axios";
import { redirect } from "react-router-dom";

export const account = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/users/",
});

account.interceptors.request.use((config) => {
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
    const response = await account.post("signup/", {
      email,
      password,
    });

    const { user } = response.data;

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
// console.log("FULL ERROR:", error);
// console.log("MESSAGE:", error.message);
// console.log("RESPONSE:", error.response);
// console.log("REQUEST:", error.request);

export const logIn = async (email, password) => {
  try {
    const response = await account.post("login/", {
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

export const userConfirmation = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const response = await account.get("info/");
    return response.data.email;
  } catch (error) {
    console.error(errorMessage(error));
    localStorage.removeItem("token");
    return null;
  }
};

export const userLogOut = async () => {
  try {
    await account.post("logout/");
  } catch (error) {
    console.error(
      "logout request failed",
      errorMessage(error),
    );
  }
  localStorage.removeItem("token");
  return null;
};

export const requireLogin = async () => {
  if (!localStorage.getItem("token")) {
    throw redirect("/");
  }
  return null;
};

export const redirectIfLoggedIn = async () => {
  return localStorage.getItem("token")
    ? redirect("home/")
    : null;
};
