import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import AboutPage from "./Pages/AboutPage";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import {
  redirectIfLoggedIn,
  requireLogin,
  userConfirmation,
} from "./services/accounts";
import ExercisePage from "./Pages/ExercisePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        loader: redirectIfLoggedIn,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "home",
        element: <HomePage />,
        loader: requireLogin,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "exercise/:id",
        element: <ExercisePage/>
      },
      // {
      //   path: "error",
      //   element: <ErrorPage />,
      // },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
