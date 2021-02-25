export const formatInto3Digits = (id: string | number) => {
  const fourFiveOrSixDigits = '000' + id;
  const threeDigits = fourFiveOrSixDigits.slice(Math.max(fourFiveOrSixDigits.length - 3, 1));
  return threeDigits;
};
