import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UpdateTodo } from "./UpdateTodo";
import { useOutletContext } from "react-router-dom";
import { DeleteTodo } from "./DeleteTodo";
import { headers } from "../../utils/apiConfig";

export const Detail = () => {
  const [todos, setTodos] = useOutletContext<any[]>();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const params = useParams();
  const todoId = params.id;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getTodoDetail = async () => {
    try {
      const { data } = await axios.get(`/api/todos/${todoId}`, headers);
      if (!token) throw new Error();
      setTitle(data.data.title);
      setContent(data.data.content);
    } catch {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    getTodoDetail();
  });

  const updateHandler = async (title: string, content: string) => {
    try {
      const data = { title, content };
      await axios.put(`/api/todos/${todoId}`, data, headers);

      if (!token) throw new Error();
      setTodos((preTodos: any) => {
        const index = preTodos.findIndex((x: any) => todoId === x.id);
        preTodos[index].title = title;
        preTodos[index].content = content;
        return [...preTodos];
      });
    } catch {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/auth/login");
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/todos/${todoId}`, headers);
      if (!token) throw new Error();
      navigate("/");
    } catch {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/auth/login");
    }
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
