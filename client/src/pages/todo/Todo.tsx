import axios from "axios";
import { useEffect, useState } from "react";
import { CreateTodo } from "./CreateTodo";

/*
컴포넌트 설계 방법
1. state를 todo에 하나만 주고 프롭스로 전달하고 이벤트를 내려주기
2. state를 각 컴포넌트 프롭스로 전달하여 변경해주기
*/

const List = ({ todos }: any) => {
  console.log(todos);
  //TODO: todos 없을 수도 있으니 예외처리해주기
  const todoList = todos.data?.map((todo: any) => {
    return <li key={todo.id}>{todo.title}</li>;
  });
  return (
    <nav>
      <ul>{todoList}</ul>
    </nav>
  );
};

export const Todo = () => {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<string[]>([]);

  console.log(token);

  const createHandler = (title: string, content: string) => {
    axios
      .post(
        "http://localhost:8080/todos",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setTodos((preTodo) => [...preTodo, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTodo = () => {
    axios
      .get("http://localhost:8080/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <h1>✏️TODO LIST</h1>
      <List todos={todos} />
      <CreateTodo onCreate={createHandler} />
    </>
  );
};
