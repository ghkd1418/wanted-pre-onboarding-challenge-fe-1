import { Link } from "react-router-dom";

interface todoType {
  title: string;
  id: string;
  content: string;
  createAt: string;
  updateAt: string;
}

export const List = ({ todos }: any) => {
  const todoList = todos?.map((todo: todoType) => {
    return (
      <li key={todo.id}>
        <Link to={`/${todo.id}`}>{todo.title}</Link>
      </li>
    );
  });
  return (
    <nav>
      <ul>{todoList}</ul>
    </nav>
  );
};
