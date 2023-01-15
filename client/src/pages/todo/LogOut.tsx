import { useNavigate } from "react-router-dom";
import { ERROR } from "../../utils/constant";

export const LogOut = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          alert(ERROR.LOGIN_REQUIRED_MESSAGE);
          navigate("/auth/login");
        }}
      >
        Logout
      </button>
    </>
  );
};
