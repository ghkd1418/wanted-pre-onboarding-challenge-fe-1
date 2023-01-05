import axios from "axios";
import { useEffect, useState } from "react";
import { CreateTodo } from "./CreateTodo";
import { List } from "./List";

/*
컴포넌트 설계 방법
1. state를 todo에 하나만 주고 프롭스로 전달하고 이벤트를 내려주기
2. state를 각 컴포넌트 프롭스로 전달하여 변경해주기
*/

export const Todo = () => {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState<string[]>([]);

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
        setTodos((preTodo: any) => {
          return [...preTodo, res.data.data];
        });
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
        setTodos(res.data.data);
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
