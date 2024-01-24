import { ElementStates } from "../../types/element-states";

export type TElement = {
  value: string;
  state: ElementStates
}

export const swapElements = (array: TElement[], firstIndex: number, secondIndex: number) => {
  return [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
}

export const getSourceString = (sourceString: string): TElement[] => {
  return sourceString.split('').map((value => ({ value, state: ElementStates.Default })));
}

export const reverseTst = (sourceString: string) => {
  const arr = sourceString.split('');
  const middle = Math.round(arr.length / 2);
  for (let i = 0; i < middle; i++) {
    let j = arr.length - 1 - i;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}