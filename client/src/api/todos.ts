import { api } from "../utils/apiConfig";

export const getTodos = () => {
  return api.get("/todos").then(({ data }) => data.data);
};
