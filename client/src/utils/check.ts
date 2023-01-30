export const checkToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("require token");
};
