import { Link } from "react-router-dom";

interface Todo {
  title: string;
  id: string;
  content: string;
  createAt: string;
  updateAt: string;
}

interface ListProps {
  todos: Todo[];
}

export const List = ({ todos }: ListProps) => {
  const todoList = todos?.map((todo: Todo) => {
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
