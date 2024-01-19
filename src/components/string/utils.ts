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

// const reverse = async (arr: TElement[]) => {

//   const revList = [][];

//   const middle = Math.round(arr.length / 2);

//   for (let i = 0; i < middle; i++) {
//     let j = arr.length - 1 - i;

//     if (i !== j) {
//       arr[i].state = ElementStates.Changing;
//       arr[j].state = ElementStates.Changing;
//       revList.push(arr);
//     };

//     swapElements(arr, i, j); 

//     arr[i].state = ElementStates.Modified;
//     arr[j].state = ElementStates.Modified;

//     setStrArray([...arr]);
//   }
// };