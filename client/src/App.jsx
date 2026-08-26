import "./App.css";
import { Outlet, useLoaderData } from "react-router-dom";

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";

function App() {
  const loaderUser = useLoaderData();
  const [user, setUser] = useState(loaderUser);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} setUser={setUser} />

      {user && <Sidebar />}

      <main className="flex-1">
        <Outlet context={{ user, setUser }} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
