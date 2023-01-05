export const List = ({ todos }: any) => {
  //TODO: todos 없을 수도 있으니 예외처리해주기
  const todoList = todos?.map((todo: any) => {
    console.log(todo);
    return <li key={todo.id}>{todo.title}</li>;
  });
  return (
    <nav>
      <ul>{todoList}</ul>
    </nav>
  );
};
