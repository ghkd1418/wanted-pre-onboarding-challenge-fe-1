import { useQuery } from "react-query";
import { getTodos } from "../../api/todos";
import { checkToken } from "../../utils/check";

export const useTodosQuery = (parmas: string | undefined) => {
  return useQuery(parmas || "todos", getTodos);
};
