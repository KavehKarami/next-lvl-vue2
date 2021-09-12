// REVIEW: write filter with global way
export default (value) => {
  let date = new Date(value);
  return date.toLocaleString(["en-US"], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
