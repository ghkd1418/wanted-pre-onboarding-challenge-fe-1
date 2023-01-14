import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils/apiConfig";

interface inputType {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isValid, setIsvalid] = useState(true);
  const [inputs, setInputs] = useState<inputType>({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const fetchLogin = async () => {
    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate("/");
    } catch (err: any) {
      alert(err.response.data.details);
    }
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
  //FIXME: 로그인로직이 실행되면 안됨 상위에서 막아줘야함
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
      <button onClick={fetchLogin} disabled={isValid}>
        로그인
      </button>
    </>
  );
};
