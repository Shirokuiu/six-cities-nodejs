import { join, resolve } from 'node:path';

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0): number =>
  +(Math.random() * (max - min) + min).toFixed(numAfterDigit);

export const shuffle = <T>(arr: T[]): T[] => {
  const copyArr: T[] = [...arr];
  let currentIndex: number = copyArr.length;
  let randomIndex: number;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex -= 1;
    [copyArr[currentIndex], copyArr[randomIndex]] = [copyArr[randomIndex], copyArr[currentIndex]];
  }

  return copyArr;
};

export const getRandomItems = <T>(items: T[]): T[] => {
  const startPosition: number = generateRandomValue(0, items.length - 1);
  const endPosition: number = startPosition + generateRandomValue(startPosition, items.length);

  return shuffle(items.slice(startPosition, endPosition));
};

export const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

export const getAbsolutePath = (filePath: string): string => join(resolve(), filePath);
