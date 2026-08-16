import { useNavigate, Link } from "react-router-dom";
import { userLogOut } from "../../services/accounts";
import {
  logoutBtn,
  navBanner,
  gainsClass,
  welcomeClass,
  spanClass,
  navClass,
  linkClass,
  formClass,
  searchBtn,
  searchInput,
} from "./styles/tailwindStyles";
import { useState } from "react";
import clsx from "clsx";

export default function Navbar({ user, setUser }) {
  const [searchExercise, setSearchExercise] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    setUser(await userLogOut());
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchExercise) {
      return;
    }
    navigate("/exercise");
    setSearchExercise("");
  };

  const name = user?.split("@")[0];
  return (
    <>
      <div
        className={clsx(
          navBanner,
          !user && "justify-center",
        )}
      >
        <h3 className={gainsClass}>Gains Squad</h3>

        {user && (
          <>
            <nav className={navClass}>
              <Link to="/home">
                <button
                  data-cy="homeBtn"
                  className={linkClass}
                >
                  Home
                </button>
              </Link>

              <Link to="/about">
                <button
                  data-cy="aboutBtn"
                  className={linkClass}
                >
                  About
                </button>
              </Link>
            </nav>

            <form
              onSubmit={handleSubmit}
              className={formClass}
            >
              <input
                type="text"
                data-cy="searchInput"
                placeholder="Search exercise..."
                value={searchExercise}
                onChange={(e) =>
                  setSearchExercise(e.target.value)
                }
                className={searchInput}
              />

              <button
                data-cy="searchBtn"
                className={searchBtn}
              >
                Search
              </button>
            </form>

            <div className={welcomeClass}>
              Hi <span className={spanClass}>{name}</span>
            </div>

            <button
              data-cy="logout-btn"
              className={logoutBtn}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
