export const computeTextColor = (col: "white" | "black" | null) => {
  const textColorAll = computed(() => {
    if (col == "white") {
      return { color: "white" };
    } else if (col == "black") {
      return { color: "black" };
    } else {
      return { color: "black" };
    }
  });
  return textColorAll;
};
