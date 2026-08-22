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
  warpTextDiv,
} from "./styles/tailwindStyles";
import { useState } from "react";
import clsx from "clsx";

import WarpText from "../ReactBits/WarpText";

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

//   const searchExerciseByName = (name) => {
//   return exercise.filter((item) =>
//     item.name.toLowerCase().includes(name.toLowerCase())
//   );
// };

  const name = user?.split("@")[0];
  return (
    <>
      <div
        className={clsx(
          navBanner,
          !user && "justify-center",
        )}
      >
        <div className={warpTextDiv}>
          <WarpText
            className={gainsClass}
            text="Gains Squad"
            color="#000000"
            warpStrength={0.08}
            warpScale={1.7}
            speed={0.55}
            pointerInfluence={0.42}
            pointerStrength={0.36}
            refraction={0.018}
            ripple
            fontSize={90}
            fontWeight={800}
            style={{ height: "10px" }}
            fontFamily="inherit"
            letterSpacing={-0.06}
            lineHeight={0.93}
          />
        </div>
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

