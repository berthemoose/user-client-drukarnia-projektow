export const getDots = (areThereDots: boolean | undefined) => {
  const dots = ref("");

  let dotCount = 0;
  let interval: number | null = null;

  onMounted(() => {
    if (areThereDots) {
      interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        dots.value = ".".repeat(dotCount);
      }, 500);
    }
  });

  onUnmounted(() => {
    if (interval) clearInterval(interval);
  });

  return {
    dots,
  };
};
