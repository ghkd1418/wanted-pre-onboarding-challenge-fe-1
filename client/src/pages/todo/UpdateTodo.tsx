import { useNavigate } from "react-router-dom";
import { isValidInput } from "./isValidInput";

interface UpdateTodoProps {
  onUpdate: (title: string, content: string) => void;
  title?: string | null;
  content?: string | null;
}

export const UpdateTodo: React.FC<UpdateTodoProps> = ({
  onUpdate,
  title,
  content,
}: any) => {
  const navigate = useNavigate();
  const submitHandler = (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    isValidInput(title, content) && onUpdate(title, content);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <p>
          <input name="title" placeholder="title" defaultValue={title || ""} />
        </p>
        <p>
          <textarea
            name="content"
            placeholder="content"
            defaultValue={content || ""}
          />
        </p>
        <input type="submit" value="Update" />
      </form>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        cancel
      </button>
    </>
  );
};
