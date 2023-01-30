import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CreateTodo } from "./CreateTodo";
import { List } from "./List";
import { Header } from "./Header";
import { LogOut } from "./LogOut";
import { api } from "../../utils/apiConfig";
import { ERROR } from "../../utils/constant";
import { useTodosQuery } from "../../hooks/queries/todos";

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
  //FIXME: 두 번 랜더링 된 이유 = 리엑트 쿼리떄문에...

  const { data } = useTodosQuery(params.id);

  // useEffect(() => {
  //   console.log("useefect");
  //   // throw new Error("유즈이펙트에러");
  // }, []);

  return (
    <>
      <LogOut />
      <Header />
      <List todos={data} />
      <CreateTodo onCreate={createTodo} />
      <Outlet context={[todos, setTodos]} />
      {console.log("랜더링")}
    </>
  );
};
