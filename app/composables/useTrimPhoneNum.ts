export const useTrimPhoneNum = (phoneNum: string) => {
  let trimmedNum = phoneNum.replace(/\s+/g, "");
  return trimmedNum;
};
