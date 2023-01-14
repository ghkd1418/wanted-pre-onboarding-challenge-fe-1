import { useEffect, useState } from "react";
import { api } from "../../utils/apiConfig";

interface inputType {
  email: string;
  password: string;
}

export const SignUp = () => {
  const [isValid, setIsvalid] = useState<boolean>(true);
  const [inputs, setInputs] = useState<inputType>({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const fetchSignUp = async () => {
    try {
      const res = await api.post("/users/create", { email, password });
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response.data.details);
    }
  };

  const checkInput = () => {
    const regex = /[\w\-\.]+\@[\w\-\.]+/;
    if (password.length >= 8 && regex.test(email)) {
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
        회원가입
      </button>
    </>
  );
};
