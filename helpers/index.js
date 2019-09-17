export const cutText = (text, length, more = "...") => {
  return `${text.length > length ? text.slice(0, length) + more : text}`;
};
