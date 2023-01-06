import { useNavigate } from "react-router-dom";

export const LogOut = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          alert("로그인 후 이용 가능합니다.");
          navigate("/auth/login");
        }}
      >
        Logout
      </button>
    </>
  );
};
