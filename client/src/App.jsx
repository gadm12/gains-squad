import "./App.css";
import { Outlet, useLoaderData } from "react-router-dom";

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const loaderUser = useLoaderData();
  const [user, setUser] = useState(loaderUser);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      {user && <Sidebar />}
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
