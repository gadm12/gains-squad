import clsx from "clsx";
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useState } from "react";
import { signUp } from "../services/accounts";
import {
  signCard,
  formClass,
  inputClass,
  logSign,
  logBtn,
  labelClass,
  memberClass,
} from "./styles/tailwindStyles";
import "./styles/styles.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSignup = pathname === "/signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signUp(email, password);
    console.log(result);
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            className={inputClass}
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={logBtn} type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>
          <Link className={memberClass} to="/">
            already a member
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
