import { resetInput } from "../../utils/util";
import { isValidInput } from "./isValidInput";

export const CreateTodo = ({ onCreate }: any) => {
  const submitHandler = (e: any): void => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    isValidInput(title, content) && onCreate(title, content);
    resetInput(e);
  };

  return (
    <form onSubmit={submitHandler}>
      <p>
        <input name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="content" placeholder="content" />
      </p>
      <input type="submit" value="Create" />
    </form>
  );
};
