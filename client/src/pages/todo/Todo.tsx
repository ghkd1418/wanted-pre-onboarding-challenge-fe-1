import axios from "axios";
import { useEffect, useState } from "react";
import { CreateTodo } from "./CreateTodo";

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CreateTodo onCreate={createHandler} />
      <h1>TODO LIST</h1>
    </>
  );
};
