import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Detail = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const params = useParams();
  const todoId = params.id;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/todos/${todoId}`, {
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
        console.log(err);
        alert("로그인이 필요한 서비스입니다.");
        navigate("/auth/login");
      });
  });

  return (
    <article>
      <h3>{title}</h3>
      <p>{content}</p>
    </article>
  );
};
