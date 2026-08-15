import { useNavigate } from "react-router-dom";
import { userLogOut } from "../services/accounts";

export default function HomePage() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await userLogOut();
    navigate("/"); // <= redirect after logout
  };
  return (
    <>
      <button onClick={handleLogout}>logout</button>
    </>
  );
}
