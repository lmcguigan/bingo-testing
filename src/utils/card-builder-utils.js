import { buildArrayOfRandomNumbers } from "./number-picker-utils";

export const createObject = value => {
    const obj = {
      value: value,
      marked: false,
    };
    return obj;
  };
  
  export const createArrayOfObjects = array => array.map(e => createObject(e));

  export const createBingoCard = (n) => {
      const numbers = buildArrayOfRandomNumbers(n)
      return createArrayOfObjects(numbers)
  }