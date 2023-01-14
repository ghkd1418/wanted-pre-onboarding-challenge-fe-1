import { ERROR } from "../../utils/constant";

export const isValidInput = (title: string, content: string) => {
  if (title === "") return alert(ERROR.TITLE_REQUIRED_MESSAGE);
  else if (content === "") return alert(ERROR.CONTENT_REQUIRED_MESSAGE);
  return true;
};
