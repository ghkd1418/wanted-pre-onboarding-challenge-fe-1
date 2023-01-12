import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  interface inputType {
    email: string;
    password: string;
  }

  const [isValid, setIsvalid] = useState<boolean>(true);
  const [inputs, setInputs] = useState<inputType>({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const fetchSignUp = () => {
    axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };
  const checkInput = () => {
    const emailRegex = /[\w\-\.]+\@[\w\-\.]+/;
    if (password.length >= 8 && emailRegex.test(email)) {
      setIsvalid(false);
    } else setIsvalid(true);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  useEffect(() => {
    if (token) {
      alert("이미 로그인 되어 있습니다.");
      if (token) navigate("/");
    }
    checkInput();
  }, [inputs]);

  return (
    <>
      <input name="email" type="text" placeholder="email" onChange={onChange} />
      <input
        name="password"
        type="text"
        placeholder="password"
        onChange={onChange}
      />
      <button onClick={fetchSignUp} disabled={isValid}>
        로그인
      </button>
    </>
  );
};
