/* eslint-disable import/prefer-default-export */
export const leadingZeros = (num: number, size: number) => {
  if (num) {
    let numStr = num.toString();
    while (numStr.length < size) {
      numStr = `0${numStr}`;
    }

    return numStr;
  }
  return '';
};
