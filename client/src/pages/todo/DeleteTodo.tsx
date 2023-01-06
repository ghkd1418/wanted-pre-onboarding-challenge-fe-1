export const DeleteTodo = ({ onDelete }: any) => {
  const clickHandler = () => {
    onDelete();
  };
  return (
    <>
      <button onClick={clickHandler}>Delete</button>
    </>
  );
};
