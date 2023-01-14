import { useNavigate } from "react-router-dom";
import { isValidInput } from "./isValidInput";

export const UpdateTodo = ({ onUpdate, title, content }: any) => {
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
