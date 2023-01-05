export const List = ({ todos, onDetail }: any) => {
  const clickHandler = (todoId: string) => {
    onDetail(todoId);
  };

  const todoList = todos?.map((todo: any) => {
    return (
      <li key={todo.id} onClick={() => clickHandler(todo.id)}>
        {todo.title}
      </li>
    );
  });
  return (
    <nav>
      <ul>{todoList}</ul>
    </nav>
  );
};
