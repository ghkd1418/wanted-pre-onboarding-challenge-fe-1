import axios from "axios";
import { useEffect, useState } from "react";

interface inputType {
  email: string;
  password: string;
}

const SignUpForm = () => {
  const [isValid, setIsvalid] = useState<boolean>(true);
  const [inputs, setInputs] = useState<inputType>({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const fetchLogin = () => {
    axios
      .post("http://localhost:8080/users/create", {
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };
  const checkInput = () => {
    console.log("실행됨");
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
      <button onClick={fetchLogin} disabled={isValid}>
        회원가입
      </button>
    </>
  );
};

export const SignUp = () => {
  return (
    <>
      <SignUpForm />
    </>
  );
};
