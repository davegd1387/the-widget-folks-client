import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "../api/axios";
import { User } from "./User";
const LOGOUT_URL = "/protected/logout";
export const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="profile">
      <h2>Welcome</h2>
      <User />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
