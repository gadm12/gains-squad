import axios from "axios";
import { redirect } from "react-router-dom";

export const account = axios.create({
  baseURL: "/api/v1/users/",
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

    return response.data.user;
  } catch (error) {
    console.error(errorMessage(error));
    return {
      user: null,
      error: errorMessage(error),
    };
  }
};

export const userConfirmation = async () => {
  try {
    const response = await account.get("info/");
    return response.data.email;
  } catch (error) {
    console.error(errorMessage(error));

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

  return null;
};

export const requireLogin = async () => {
  const email = await userConfirmation();
  if (!email) {
    throw redirect("/");
  }
  return null;
};

export const redirectIfLoggedIn = async () => {
  const email = await userConfirmation();
  return email ? redirect("/home") : null;
};
