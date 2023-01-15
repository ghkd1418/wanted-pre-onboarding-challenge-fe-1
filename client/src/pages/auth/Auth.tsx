import { useEffect, useState } from "react";
import { api } from "../../utils/apiConfig";
import { useParams, useNavigate } from "react-router-dom";

interface inputType {
  email: string;
  password: string;
}

export const Auth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isValid, setIsvalid] = useState<boolean>(true);
  const [inputs, setInputs] = useState<inputType>({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const { state } = useParams();

  const fetchAuth = async (url: string) => {
    try {
      const res = await api.post(url, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
      alert(res.data.message);
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

  useEffect(() => {
    if (token) {
      alert("이미 로그인 되어 있습니다.");
      navigate("/");
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
      {state === "signup" ? (
        <button onClick={() => fetchAuth("/users/create")} disabled={isValid}>
          회원가입
        </button>
      ) : (
        <button onClick={() => fetchAuth("/users/login")} disabled={isValid}>
          로그인
        </button>
      )}
    </>
  );
};
