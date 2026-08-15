import "./App.css";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { userConfirmation } from "./services/accounts";

function App() {
  useEffect(() => {
    const checkUser = async () => {
      const user = await userConfirmation();

      console.log("CONFIRMED USER:", user);
    };

    checkUser();
  }, []);
  return (
    <>
      <h1>Gains Squad</h1>
      <Outlet />
      
    </>
  );
}

export default App;
