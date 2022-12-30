/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

export function toObject<T>(arr: T[], key: string): { [key: string]: T } {
  const obj: { [key: string]: T } = {};

  for (let i = 0; i < arr.length; i++) {
    obj[(arr[i] as any)[key] || i] = arr[i];
  }

  return obj;
}
