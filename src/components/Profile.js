import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "../api/axios";
import { User } from "./User";
const LOGOUT_URL = "/protected/logout";
export const Profile = () => {
  const auth = useAuth();
  const {
    firstName,
    lastName,
    email,
    address1,
    address2,
    city,
    state,
    zip,
    tel,
    userId,
    isadmin,
  } = auth.user;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(LOGOUT_URL, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(`response.data: ${JSON.stringify(response?.data)}`);
      auth.logout();
      navigate("/");
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
      auth.logout();
    }
  };

  return (
    <div className="profile">
      <User />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
