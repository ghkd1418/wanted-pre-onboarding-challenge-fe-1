import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UpdateTodo } from "./UpdateTodo";
import { useOutletContext } from "react-router-dom";
import { DeleteTodo } from "./DeleteTodo";
import { api } from "../../utils/apiConfig";
import { ERROR } from "../../utils/constant";
import { checkToken } from "../../utils/check";

export const Detail = () => {
  const [todos, setTodos] = useOutletContext<any[]>();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const params = useParams();
  const todoId = params.id;
  const navigate = useNavigate();

  const getTodoDetail = async () => {
    try {
      const { data } = await api.get(`/todos/${todoId}`);
      checkToken();
      setTitle(data.data.title);
      setContent(data.data.content);
    } catch {
      alert(ERROR.LOGIN_REQUIRED_MESSAGE);
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    getTodoDetail();
  });

  const updateHandler = async (title: string, content: string) => {
    try {
      const data = { title, content };
      await api.put(`/todos/${todoId}`, data);

      checkToken();
      setTodos((preTodos: any) => {
        const index = preTodos.findIndex((x: any) => todoId === x.id);
        preTodos[index].title = title;
        preTodos[index].content = content;
        return [...preTodos];
      });
    } catch {
      alert(ERROR.LOGIN_REQUIRED_MESSAGE);
      navigate("/auth/login");
    }
  };

  const deleteHandler = async () => {
    try {
      await api.delete(`/todos/${todoId}`);
      checkToken();
      navigate("/");
    } catch {
      alert(ERROR.LOGIN_REQUIRED_MESSAGE);
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
