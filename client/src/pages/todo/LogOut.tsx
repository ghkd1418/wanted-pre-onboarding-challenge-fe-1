import { useNavigate } from "react-router-dom";
import { ERROR } from "../../utils/constant";

const logOutHandler = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  alert(ERROR.LOGIN_REQUIRED_MESSAGE);
  navigate("/auth/login");
};

export const LogOut = () => {
  return (
    <>
      <button onClick={logOutHandler}>Logout</button>
    </>
  );
};
