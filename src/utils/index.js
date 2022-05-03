export const formatedToday = () => {
  const now = new Date().toISOString().split("T")[0].split("-");
  return `${now[0]}/${now[1]}/${now[2]}`;
};
