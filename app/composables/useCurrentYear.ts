interface UseCurrentYearReturn {
  currentYear: number;
}

export const useCurrentYear = (): UseCurrentYearReturn => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return { currentYear };
};

