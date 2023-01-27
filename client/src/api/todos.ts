import { api } from "../utils/apiConfig";
import { checkToken } from "../utils/check";

export const getTodos = () => {
  return api.get("/todos").then(({ data }) => data.data);
};
