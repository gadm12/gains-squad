import { useNavigate } from "react-router-dom";
import { userLogOut } from "../services/accounts";

export default function HomePage() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await userLogOut();
    navigate("/");
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="text-red-500"
      >
        logout
      </button>
    </>
  );
}
