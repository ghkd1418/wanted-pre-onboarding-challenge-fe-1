interface DeleteProps {
  onDelete: () => void;
}

export const DeleteTodo = ({ onDelete }: DeleteProps) => {
  return (
    <>
      <button onClick={onDelete}>Delete</button>
    </>
  );
};
