import { Link } from "react-router-dom";

import {
  sideBarContainer,
  sideBarTitle,
  sideBarLinks,
  linkClass,
} from "./styles/tailwindStyles";

const Sidebar = () => {
  //!code

  return (
    <>
      <div className={sideBarContainer}>
        <h3 className={sideBarTitle}>Workout</h3>

        <div className={sideBarLinks}>
          <Link className={linkClass} to="/history">
            Workout History
          </Link>
          <Link className={linkClass} to="/create">
            Create Session
          </Link>
          <Link className={linkClass} to="/list">
            Exercise Library
          </Link>
          <Link className={linkClass} to="/calculator">
            Calories Calculator
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
