import { useQuery } from "react-query";
import { getTodos } from "../../api/todos";

export const useTodosQuery = (parmas: string | undefined) => {
  return useQuery(parmas || "todos", getTodos);
};
