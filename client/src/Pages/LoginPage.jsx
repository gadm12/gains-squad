import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logIn } from "../services/accounts";
import {
  signCard,
  formClass,
  inputClass,
  logSign,
  logBtn,
  labelClass,
} from "./styles/tailwindStyles";
import "./styles/styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSignup = pathname === "/signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await logIn(email, password);
    console.log(result);
    if (result.user) {
    navigate("/home"); // <= add this
  }
    
  };

  

  return (
    <>
      <div className={signCard}>
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className={clsx(
              logSign,
              isSignup
                ? "bg-gray-200 text-gray-500"
                : "bg-black text-white",
            )}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className={clsx(
              logSign,
              isSignup
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-500",
            )}
          >
            Sign Up
          </button>
        </div>
        <form className={formClass} onSubmit={handleSubmit}>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            className={inputClass}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            className={inputClass}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={logBtn} type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
