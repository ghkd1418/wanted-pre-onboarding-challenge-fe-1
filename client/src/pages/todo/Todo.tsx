import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CreateTodo } from "./CreateTodo";
import { List } from "./List";
import { Header } from "./Header";
import { LogOut } from "./LogOut";
import { api } from "../../utils/apiConfig";
import { ERROR } from "../../utils/constant";
import { checkToken } from "../../utils/check";

interface Todo {
  title: string;
  id: string;
  content: string;
  createAt: string;
  updateAt: string;
}

export const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const createTodo = async (title: string, content: string) => {
    try {
      const data = { title, content };
      const res = await api.post("/todos", data);

      setTodos((prevTodos: Todo[]) => {
        return [...prevTodos, res.data.data];
      });
    } catch {
      alert(ERROR.LOGIN_REQUIRED_MESSAGE);
      navigate("/auth/login");
    }
  };

  const getTodo = async () => {
    try {
      const { data } = await api.get("/todos");
      setTodos(data.data);
      checkToken();
    } catch {
      alert(ERROR.LOGIN_REQUIRED_MESSAGE);
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
      <CreateTodo onCreate={createTodo} />
      <Outlet context={[todos, setTodos]} />
    </>
  );
};
