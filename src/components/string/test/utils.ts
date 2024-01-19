import { swapElements } from "../utils";
import { getSourceString } from "../utils";

export const reverse = (str: string) => {
  const arr = getSourceString(str);

  const middle = Math.round(arr.length / 2);

  for (let i = 0; i < middle; i++) {
    let j = arr.length - 1 - i;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
