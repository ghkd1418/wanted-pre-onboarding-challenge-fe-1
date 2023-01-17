import { useNavigate } from "react-router-dom";
import { ERROR } from "../../utils/constant";

export const LogOut = () => {
  const logOutHandler = () => {
    const navigate = useNavigate();
    localStorage.removeItem("token");
    alert(ERROR.LOGIN_REQUIRED_MESSAGE);
    navigate("/auth/login");
  };

  return (
    <>
      <button onClick={logOutHandler}>Logout</button>
    </>
  );
};
