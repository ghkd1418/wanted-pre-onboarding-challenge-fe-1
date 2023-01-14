import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CreateTodo } from "./CreateTodo";
import { List } from "./List";
import { Header } from "./Header";
import { LogOut } from "./LogOut";
import { api } from "../../utils/apiConfig";

export const Todo = () => {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<string[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const createHandler = async (title: string, content: string) => {
    try {
      const data = { title, content };
      const res = await api.post("/todos", data);

      setTodos((preTodo: any) => {
        return [...preTodo, res.data.data];
      });
    } catch {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/auth/login");
    }
  };

  const getTodo = async () => {
    try {
      const { data } = await api.get("/todos");
      setTodos(data.data);
      if (!token) throw new Error();
    } catch {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/auth/login");
    }
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
