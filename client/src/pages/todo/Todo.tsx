import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CreateTodo } from "./CreateTodo";
import { List } from "./List";
import { Header } from "./Header";
import { LogOut } from "./LogOut";
import { headers } from "../../utils/apiConfig";

export const Todo = () => {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<string[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const createHandler = (title: string, content: string) => {
    const data = { title, content };
    axios
      .post("/api/todos", data, headers)
      .then((res) => {
        setTodos((preTodo: any) => {
          //input 초기화 해주기
          return [...preTodo, res.data.data];
        });
      })
      .catch((err) => {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/auth/login");
      });
  };

  const getTodo = () => {
    axios
      .get("/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTodos(res.data.data);
        if (!token) throw new Error();
      })
      .catch((err) => {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/auth/login");
      });
  };
  useEffect(() => {
    getTodo();
  }, [params]);

  return (
    <>
      <LogOut />
      <Header />
      <List todos={todos} />
      <CreateTodo onCreate={createHandler} />
      <Outlet context={[todos, setTodos]} />
    </>
  );
};
