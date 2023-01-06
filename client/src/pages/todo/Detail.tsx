import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UpdateTodo } from "./UpdateTodo";
import { useOutletContext } from "react-router-dom";
import { DeleteTodo } from "./DeleteTodo";

export const Detail = () => {
  const [todos, setTodos] = useOutletContext<any[]>();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const params = useParams();
  const todoId = params.id;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/api/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!token) throw new Error();
        setTitle(res.data.data.title);
        setContent(res.data.data.content);
      })
      .catch((err) => {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/auth/login");
      });
  });

  const updateHandler = (title: string, content: string) => {
    axios
      .put(
        `/api/todos/${todoId}`,
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
        if (!token) throw new Error();
        setTodos((preTodos: any) => {
          const index = preTodos.findIndex((x: any) => todoId === x.id);
          preTodos[index].title = title;
          preTodos[index].content = content;
          return [...preTodos];
        });
      })
      .catch((err) => {
        console.log(err);
        alert("로그인이 필요한 서비스입니다.");
        navigate("/auth/login");
      });
  };

  const deleteHandler = () => {
    axios
      .delete(`/api/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!token) throw new Error();
        navigate("/");
      })
      .catch((err) => {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/auth/login");
      });
  };

  return (
    <article>
      <h3>{title}</h3>
      <p>{content}</p>
      <DeleteTodo onDelete={deleteHandler} />
      <UpdateTodo onUpdate={updateHandler} title={title} content={content} />
    </article>
  );
};
