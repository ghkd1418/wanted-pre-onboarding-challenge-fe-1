import ErrorBoundary from "../../common/error-boundary";
import { Todo } from "./Todo";

export const TodoList = () => {
  return (
    <ErrorBoundary fallback={<>애러발생</>}>
      <Todo />
    </ErrorBoundary>
  );
};
