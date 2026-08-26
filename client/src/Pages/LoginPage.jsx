import clsx from "clsx";
import {
  useLocation,
  useNavigate,
  Link,
  useOutletContext,
} from "react-router-dom";
import { useState } from "react";
import { logIn } from "../services/accounts";
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

const LoginPage = () => {
  const { setUser } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSignup = pathname === "/signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await logIn(email, password);
    if (result.user) {
      setUser(result.user);
      navigate("/home");
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
                ? "bg-gray-500 text-black"
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
                : "bg-gray-500 text-black",
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
            data-cy="email"
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
            data-cy="password"
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            data-cy="log-btn"
            className={logBtn}
            type="submit"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
          <Link className={memberClass} to="/signup">
            I don't have an account
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
